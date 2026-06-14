import express from "express"
import { MongoClient } from "mongodb"

const dbName = "school";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);



const app = express();
client.connect().then((connection)=>{
const db = connection.db(dbName);
app.get('/api',async(req,resp)=>{
  const collection = db.collection('students');
  const result = await collection.find().toArray();
  resp.send(result);

})

})



app.listen(3200)