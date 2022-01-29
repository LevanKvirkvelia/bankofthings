import fp from "fastify-plugin";
import addFormats from "ajv-formats";
import Ajv from "ajv/dist/2019";
import { Static, Type } from "@sinclair/typebox";
import { ethers } from "ethers";
import { ObjectId } from "mongodb";
import { Filter } from "../../libs/accessValidator/filters/Filter";
import { Apps, gatesCollection } from "../../apps";

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
    Params: { appName: string };
    Body: {
      props: any;
      filter: Static<typeof Filter>;
      sign: string;
    };
  }>("/apps/:appName/init", async (req, res) => {
    const { props, filter, sign } = req.body;
    const { appName } = req.params;
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

  fastify.post<{
    Params: { appName: string };
    Body: {
      gateId: string;
      props: any;
      sign: string;
    };
  }>("/apps/:appName/requestAccess", async (req, res) => {
    const { props, gateId, sign } = req.body;
    const { appName } = req.params;
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

    if (!ajv.validate(app.requestAccessPropsSchema, props))
      throw new Error("Bad props");

    if (!ajv.validate(Type.String({ format: "uuid" }), gateId))
      throw new Error("Bad gateId");

    const result = await app.requestAccess({ wallet, props, gateId });
    res
      .code(200)
      .cookie("sign", sign, { path: "/" })
      .send({ ok: true, ...result });
  });

  fastify.post<{
    Params: { appName: string };
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
