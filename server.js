// create basic Server
const http = require('http');
http.createServer((req,resp)=>{
  resp.write('<h1>this is server</h1>');
resp.end("hello");
}).listen(4800);