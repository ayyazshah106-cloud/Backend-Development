const http = require('http');
const fs = require('fs');




http.createServer((req,resp)=>{
  fs.write()
  resp.write('<h1>this is server</h1>');

resp.end();
}).listen(4800);