import express from "express"
import { MongoClient } from "mongodb"

const dbName = "school";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);



const app = express();
app.set("view engine",'ejs')
client.connect().then((connection)=>{
const db = connection.db(dbName);
app.get('/api',async(req,resp)=>{
  const collection = db.collection('students');
  const result = await collection.find().toArray();
  resp.send(result);
})

app.get('/ui',async(req,resp)=>{
  const collection = db.collection('students');
  const result = await collection.find().toArray();
  resp.render("student",{result});
})
 app.get('/add',(req,resp)=>{
  resp.send(`<form>
    <input type ='text name ='name' placeholder = 'enter sudent name' >
    </br></br>
    <input type ='text name ='age' placeholder = 'enter sudent age' >
    </br></br>
    <input type ='text name ='name' placeholder = 'enter sudent email' >
    </br></br>
    <button> sumbit</button>
    </form>`)
 })

})

app.listen(3200);