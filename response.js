// const http = require('http');
// http.createServer((req,resp)=>{
//   resp.setHeader("Content-Type","text/html");
//   resp.write("<h2>Response</h2>")
// resp.end();
// }).listen(4800);


const http = require('http');
http.createServer((req,resp)=>{
  resp.setHeader("Content-Type","text/json");
  resp.write("<h2>Response</h2>")
resp.end();
}).listen(4800);