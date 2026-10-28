import express from "express";
import {connection,collectionName} from "./dbConfig.js"
import cors from 'cors'
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/Sign-up",async (req,res)=>{
  const userData = req.body;
  if(userData.email && userData.password){
    const db = await connection();
    const collection = await db.collection('user');
    const result = await collection.insertOne(userData);
    if(result){
      
         jwt.sign(userData,"Google",{expiresIn:"5d"},(error,token)=>{
      console.log(token)
      res.send({
        susscfull :true,
        massage :"sign up sussecsfull",
        token
      })

    })
    }else{
       res.send({
        susscfull :false,
        massage :"sign up not sussecsfull",
        token
      })

    }
 

  }


})

app.post("/Log-in",async (req,res)=>{
  const userData = req.body;
  if(userData.email && userData.password){
    const db = await connection();
    const collection = await db.collection('user');
    const result = await collection.findOne({email:userData.email,password:userData.password});
    if(result){
         jwt.sign(userData,"Google",{expiresIn:"5d"},(error,token)=>{
      console.log(token)
      res.send({
       success: true,
          message: "Login successful",
          token,
      })

    })
    }
    else{
         res.send({
       success: false,
      message: "Server error",
       
      })
    }

 

  }


})

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


app.delete("/delete/:id",async (req,res)=>{
 
  const db = await connection();
  const id = req.params.id;
  const collection = await db.collection(collectionName);
  console.log(id)

const result = await collection.deleteOne({_id:new ObjectId(id)})
if(result)(
  res.send({
    massage:"task has been deleted",
    success:true,result
  })
)
 else {
  res.send({massage : "try after some times", success :false})
 };
})

app.delete("/delete-multiple",async (req,res)=>{
 
  const db = await connection();
  const ids = req.body;
  const deleteTaskIds = ids.map((item)=>new ObjectId(item))
  const collection = await db.collection(collectionName);
  console.log(ids)

const result = await collection.deleteMany({_id:{$in:deleteTaskIds}})
if(result)(
  res.send({
    massage:"task has been deleted",result,
    success:true
  })
)
 else {
  res.send({massage : "try after some times", success :false})
 };
})




app.get("/updateTask/:id",async (req,res)=>{
  const id = req.params.id;
  const db = await connection();
  const collection = await db.collection(collectionName)
  const result = await collection.findOne({_id:new ObjectId(id)})
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

app.put("/taskUpdate",async (req,res)=>{
 
  const db = await connection();
  const collection = await db.collection(collectionName);
  const {_id,...fields}= req.body;
  const update = {$set:fields}
  
  const result = await collection.updateOne({_id:new ObjectId(_id)},update)
 if(result){
  res.send({
    massage : "Task has been update",result,
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
app.listen(3200);
