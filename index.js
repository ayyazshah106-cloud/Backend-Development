import express from "express"
import { MongoClient } from "mongodb"

const dbName = "school";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function dbConnection(){
await client.connect();
const db = client.db(dbName);
const collections = db.collection("students");
const result = await collections.find().toArray()
console.log(result);
}
dbConnection();
const app = express();
app.listen(3200);