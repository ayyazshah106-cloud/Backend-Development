import express from "express"
import { MongoClient } from "mongodb"

const dbName = "school";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);



const app = express();
app.set("view engine","ejs")
app.get("/",async (req,resp)=>{
await client.connect();
const db = client.db(dbName);
const collections = db.collection("students");
const result = await collections.find().toArray();
console.log(result);

resp.render("student",{result})
})


app.listen(3200)