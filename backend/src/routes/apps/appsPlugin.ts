import fp from "fastify-plugin";
import addFormats from "ajv-formats";
import Ajv from "ajv/dist/2019";
import { Static, Type } from "@sinclair/typebox";
import { ethers } from "ethers";
import { ObjectId } from "mongodb";
import { Filter } from "../../libs/accessValidator/filters/Filter";
import { Apps, Gate, gatesCollection, getGateDocument } from "../../apps";
import { evalFilter } from "../../libs/accessValidator/filters/evalFilter";

const ajv = addFormats(new Ajv({}), [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
])
  .addKeyword("kind")
  .addKeyword("modifier");

export default fp(async function (fastify, opts) {
  fastify.post<{
    Body: {
      appName: string;
      props: any;
      filter: Static<typeof Filter>;
      sign: string;
    };
  }>("/apps/init", async (req, res) => {
    const { props, appName, filter, sign } = req.body;
    const app = Apps[appName.toLowerCase()];

    if (!app) {
      res
        .code(404)
        .send({ error: `Application "${appName.toLowerCase()}" not found` });
      return;
    }

    const wallet = ethers.utils.verifyMessage(
      "Bank of Things sign-in message",
      sign
    );

    if (!ajv.validate(Filter, filter)) throw new Error("Bad filter");
    if (!ajv.validate(app.initializePropsSchema, props))
      throw new Error("Bad params");

    return app.initialize({ wallet, props, filter });
  });

  const EDITABLE_PROPS_SCHEMA = Type.Partial(
    Type.Pick(Gate, ["active", "title", "filter"]),
    {
      additionalProperties: false,
    }
  );

  fastify.post<{
    Body: {
      gateId: string;
      value: any;
      sign: string;
    };
  }>("/apps/update", async (req, res) => {
    const { value, sign, gateId } = req.body;

    const gate = await getGateDocument(gateId, ["appName"]);
    if (!gate) throw new Error("You do not have access to this gate");
    const appName = gate.appName.toLowerCase();

    const app = Apps[appName];

    if (!app) {
      res.code(404).send({ error: `Application "${appName}" not found` });
      return;
    }

    const wallet = ethers.utils.verifyMessage(
      "Bank of Things sign-in message",
      sign
    );

    if (!ajv.validate(EDITABLE_PROPS_SCHEMA, value))
      throw new Error("Bad value");

    const updateResult = await gatesCollection.updateOne(
      { id: gateId, owner: wallet },
      { $set: value }
    );
    return !!updateResult.matchedCount
      ? { ok: true }
      : {
          ok: false,
          error: "Gate not found or you dont have permission to the gate",
        };
  });

  fastify.post<{
    Body: {
      gateId: string;
      props: any;
      sign: string;
    };
  }>("/apps/requestAccess", async (req, res) => {
    const { props, gateId, sign } = req.body;

    const gate = await getGateDocument(gateId);
    if (!gate) throw new Error("You do not have access to this gate");
    const appName = gate.appName.toLowerCase();

    const app = Apps[appName as keyof typeof Apps];

    if (!app) {
      res.code(404).send({ error: `Application "${appName}" not found` });
      return;
    }

    const wallet = ethers.utils.verifyMessage(
      "Bank of Things sign-in message",
      sign
    );

    if (!ajv.validate(app.requestAccessPropsSchema, props))
      throw new Error("Bad props");

    const result = await app.requestAccess({
      // @ts-ignore
      gate,
      wallet,
      props,
    });

    res
      .code(200)
      .cookie("sign", sign, { path: "/" })
      .send({ ok: true, ...result });
  });
  fastify.post<{
    Body: {
      gateId?: string;
      sign?: string;
    };
  }>("/apps/info", async (req, res) => {
    const { gateId, sign } = req.body;

    const wallet = sign
      ? ethers.utils.verifyMessage("Bank of Things sign-in message", sign)
      : null;

    const gate = !!gateId && (await getGateDocument(gateId, ["appName"]));

    return { gate };
  });

  fastify.post<{
    Body: {
      gateId?: string;
      userAddress?: string;
      filter?: any;
      sign?: string;
    };
  }>("/apps/validate", async (req, res) => {
    const { filter: passedFilter, gateId, sign, userAddress } = req.body;

    const gate =
      !!gateId && (await getGateDocument(gateId, ["filter", "appName"]));
    if (!gate && !passedFilter) throw new Error("Please pass a valid body");

    const filter = gate.filter || passedFilter;

    const wallet = sign
      ? ethers.utils.verifyMessage("Bank of Things sign-in message", sign)
      : null;

    if (!userAddress && !wallet)
      throw new Error("Pass a valid sign or userAddress");

    const hasAccess = await evalFilter(filter, {
      user_address: userAddress || wallet,
    });
    return { hasAccess, gate };
  });

  fastify.post<{
    Body: { sign: string };
    Querystring: {
      cursor: string;
    };
  }>("/apps/list", async (req) => {
    const { sign } = req.body;
    const { cursor } = req.query;

    const wallet = ethers.utils.verifyMessage(
      "Bank of Things sign-in message",
      sign
    );

    const list = await gatesCollection
      .find(
        {
          owner: wallet,
          _id: {
            $lte: cursor
              ? ObjectId.createFromHexString(cursor)
              : new ObjectId(),
          },
        },
        {
          sort: { _id: -1 },
          limit: 20,
          projection: { id: 1, filter: 1, appName: 1, active: 1, title: 1 },
        }
      )
      .toArray();
    return { ok: true, list };
  });
});
