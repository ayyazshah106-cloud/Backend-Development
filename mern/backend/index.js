import express from "express";
import {connection,collectionName} from "./dbConfig.js"
import cors from 'cors'
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import crypto from "crypto";


const app = express();
app.use(express.json());
app.use(cors({
  origin :"http://localhost:5173",
  credentials:true,
}));
app.use(cookieParser())

app.post("/Sign-up",async (req,res)=>{

   
  
  
  const userData = req.body;
  

  if (!userData.name || !userData.email || !userData.password) {
    return res.send({
      success: false,
      message: "Credentials are missing. Please fill in all required fields."
    });
  }

 const db = await connection();
 const collection = db.collection("user");

 const AlreadyRegisterd = await collection.findOne({
  $or: [
        { email: userData.email },
        { password: userData.password },
        { username: userData.username }
    ]
    });

     if (AlreadyRegisterd) {
      return res.status(409).send({
        success: false,
        message: "Acount Already Exit Please Login your Account"
      });
    }


const {email,password} = userData;

const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  if(email && hashedPassword){
    const db = await connection();
    const collection = await db.collection('user');
      const newUser = {
    ...userData,
    password: hashedPassword
  };
    const result = await collection.insertOne(newUser);
    if(result){


      
      
         jwt.sign(userData,"Google",{expiresIn:"5d"},(error,token)=>{
      console.log(token)
      res.send({
        message :"sign up sussecsfull",
        susscfull :true,
        token
      })

    })
    }
    else{
       res.send({
        susscfull :false,
        massage :"sign up not sussecsfull",
        token
      })

    }
 

  }


})

// app.post("/Log-in",async (req,res)=>{
//   const {name,email,password} = req.body;
// const db = await connection();
// const collection = db.collection("user");
//   const user = await collection.findOne({email})

//  if (!user) {
//         return res.status(401).json({
//             message: "Invalid email or password"
//         })
//     }

//         const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

//  const isPasswordValid = hashedPassword === user.password;
//   if (!isPasswordValid) {
//         return res.status(401).json({
//             message: "Invalid email or password"
//         })
//     }

    // const refreshToken = jwt.sign({
    //     id: user._id
    // }, "Google",
    //     {
    //         expiresIn: "7d"
    //     }
    //     ,(error,refreshToken)=>{
    //   console.log(token)
    //   res.send({
    //    success: true,
    //       message: "Login successful",
    //       token,
    //   })

    // }
    // )


 
app.post("/Log-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const db = await connection();
    const collection = db.collection("user");

    // Find user
    const user = await collection.findOne({
      email: email,
    
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Hash password
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Check password
    const isPasswordValid =
      hashedPassword === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Refresh Token
    const refreshToken = jwt.sign(
      { id: user._id },
      "google",
      { expiresIn: "7d" }
    );

    // Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Access Token
    const accessToken = jwt.sign(
      { id: user._id },
     "facebook",
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});


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
  console.log("cookies data",req.cookies['token'])
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
