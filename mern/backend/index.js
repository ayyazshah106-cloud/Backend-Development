import express from "express";
import {connection,collectionName} from "./dbConfig.js"
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());
app.post("/add",async (req,res)=>{
 const db = await connection();
 const collection = await db.collection(collectionName);
 const result = await collection.insertOne(req.body);
 if(result){
  res.send({
     message:"Task Has been added",
  success:true
  }

)
 }else{
 res.send({
  message:"Task Has been not added",
  success:false
 })
 }
})

app.get("/add-list",async (req,res)=>{
  const db = await connection();
  const collection = await db.collection(collectionName)
  const result = await collection.find().toArray();
 if(result){
  res.send({
    massage : "Task has been send",result,
    success:true
  })
 }
 else {
  res.send({massage : "try after some times", success :false})
 };
 
})


app.get("/",(req,res)=>{
res.send({
  message:"basic api done",
  success:true
})
})
app.listen(3000);
