import { mongoDB } from "../libs/mongo";
import { Static, TSchema, Type } from "@sinclair/typebox";
import { Filter } from "../libs/accessValidator/filters/Filter";
import { Notion } from "./notion/Notion";

export const Gate = Type.Object({
  id: Type.String(),
  filter: Filter as typeof Filter,
  owner: Type.String(),
  appName: Type.String(),
  title: Type.String(),
  appContext: Type.Any(),
  active: Type.Boolean(),
});

export const gatesCollection = mongoDB.collection<Static<typeof Gate>>("gates");
gatesCollection.createIndex({ id: 1 }, { unique: true });
gatesCollection.createIndex({ owner: 1 });

export const GateLogs = Type.Object({
  gateId: Type.String(),
  wallet: Type.String(),
  props: Type.Any(),
  active: Type.Boolean(),
});

export const gateLogsCollection =
  mongoDB.collection<Static<typeof GateLogs>>("gateLogs");
gateLogsCollection.createIndex({ wallet: 1, gateId: 1, active: 1 });

export async function getGateDocument<AppContext>(gateId: string) {
  const gate = await gatesCollection.findOne({ id: gateId });
  return gate as Omit<Static<typeof Gate>, "appContext"> & {
    appContext: AppContext;
  };
}

export interface IApp<InitProps extends TSchema, ActionProps extends TSchema> {
  initializePropsSchema: InitProps;
  initialize: (props: {
    wallet: string;
    filter: Static<typeof Gate>["filter"];
    props: Static<InitProps>;
  }) => Promise<{ gateId: string }>;
  stopAccess: (props: { gateId: string; wallet: string }) => Promise<void>;
  requestAccessPropsSchema: ActionProps;
  requestAccess: (props: {
    gateId: string;
    wallet: string;
    props: Static<ActionProps>;
  }) => Promise<void | { redirect: string }>;
}

export const Apps = {
  notion: Notion,
};
