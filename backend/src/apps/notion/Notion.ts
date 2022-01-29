import { NotionAPI } from "notion-client";
import { getPageTitle, idToUuid, uuidToId } from "notion-utils";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import {
  gateLogsCollection,
  gatesCollection,
  getGateDocument,
  IApp,
} from "../";
import { notionUpdatePermission } from "./api";
import { evalFilter } from "../../libs/accessValidator/filters/evalFilter";
import { Type } from "@sinclair/typebox";

const notionAPI = new NotionAPI({
  authToken: process.env.NOTION_AUTH_TOKEN as string,
});

export const NotionPermissions = {
  none: "none",
  admin: "editor",
  editor: "read_and_write",
  comment_only: "comment_only",
  viewer: "reader",
};

type GateAppContext = {
  spaceId: string;
  pageId: string;
  permission: keyof typeof NotionPermissions;
};

const initializePropsSchema = Type.Object({
  pageLink: Type.String(),
  permission: Type.Union(
    Object.keys(NotionPermissions).map((v) => Type.Literal(v))
  ),
});

const requestAccessPropsSchema = Type.Object({
  email: Type.String({ format: "email" }),
});

export const Notion: IApp<
  typeof initializePropsSchema,
  typeof requestAccessPropsSchema
> = {
  initializePropsSchema,
  initialize: async ({ wallet, filter, props: { pageLink, permission } }) => {
    const pageId = idToUuid(
      pageLink.match(/[0-9a-f]{12}4[0-9a-f]{3}[89ab][0-9a-f]{15}/)[0]
    );
    const result = await notionAPI.getPage(pageId);
    const title = getPageTitle(result);
    const accessToken = md5(`${wallet}:bankofthings`.toLowerCase());
    console.log(accessToken);
    if (!title.includes(accessToken))
      throw new Error(
        `The page title must include the accessToken: "${accessToken}"`
      );

    const { space_id: spaceId } = result.block[pageId].value;
    console.log(spaceId);

    const gateId = uuidv4();
    await gatesCollection.insertOne({
      id: gateId,
      appContext: { spaceId, pageId, permission },
      owner: wallet,
      appName: "notion",
      title: pageLink,
      filter,
      active: true,
    });

    return { gateId };
  },
  stopAccess: async ({ gateId, wallet }) => {
    const gate = await getGateDocument<GateAppContext>(gateId);
    const { pageId, spaceId } = gate.appContext;
    const gateLog = await gateLogsCollection.findOne({
      gateId,
      wallet,
      active: true,
    });

    if (!gateLog) return;

    const { email } = gateLog.props;
    await notionUpdatePermission(notionAPI, {
      permission: "none",
      pageId,
      spaceId,
      email,
    });

    await gateLogsCollection.updateOne(
      {
        _id: gateLog._id,
      },
      { $set: { active: false } }
    );
  },
  requestAccessPropsSchema,
  requestAccess: async ({ gateId, wallet, props }) => {
    const gate = await getGateDocument<GateAppContext>(gateId);
    if (!gate) throw new Error("You do not have access to this gate");

    const hasAccess = await evalFilter(gate.filter, { user_address: wallet });
    if (!hasAccess) throw new Error("You do not have access to this gate");

    const { permission, pageId, spaceId } = gate.appContext;
    const { email } = props;

    await gateLogsCollection.insertOne({ gateId, wallet, props, active: true });
    await Notion.stopAccess({ gateId, wallet });
    await notionUpdatePermission(notionAPI, {
      permission,
      pageId,
      spaceId,
      email,
    });

    return { redirect: `https://www.notion.so/${uuidToId(pageId)}` };
  },
};
