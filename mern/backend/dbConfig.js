import "dotenv/config";
import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const url = process.env.MONGODB_URI;
const dbName = "todo";

export const collectionName = "add-list";

const client = new MongoClient(url);

export const connection = async () => {
  await client.connect();
  console.log('db has been connected')
  return client.db(dbName);
};
