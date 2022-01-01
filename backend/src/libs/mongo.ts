import { Db, MongoClient, MongoClientOptions } from "mongodb";

// eslint-disable-next-line import/no-mutable-exports
export let mongoDB: Db;

export const mongoRef: {
  db?: Db;
  connectionPromise?: Promise<{ client: MongoClient; databaseName: string }>;
} = {};

export async function mongoConnect() {
  if (mongoRef.connectionPromise) return mongoRef.connectionPromise;

  const options: MongoClientOptions = {
    ca: process.env.DB_CERT,
  };

  mongoRef.connectionPromise = MongoClient.connect(
    process.env.DB_CONNECTION_STRING,
    options
  ).then((client) => {
    mongoRef.db = client.db(process.env.DB_NAME);
    mongoDB = mongoRef.db;
    return { client, databaseName: process.env.DB_NAME };
  });

  return mongoRef.connectionPromise;
}

export async function getMongo() {
  await mongoConnect();
  return mongoRef.db;
}
