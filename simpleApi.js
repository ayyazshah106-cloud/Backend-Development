const http = require('http');
const { json } = require('stream/consumers');

const userData = [
  {
    name : "ayyaz",
    age : 27,
email: "ayyazshah106@gmail.com",
  },
  {
    name : "nawas",
    age : 26,
email: "nawasshah106@gmail.com",
  },
  {
    name : "mateen",
    age : 56,
email: "mateenshah106@gmail.com",
  },
]

http.createServer((req,resp)=>{
  resp.setHeader("Content-Type","application/JSON")
  resp.write(JSON.stringify(userData));
  resp.end();
}).listen(4800);