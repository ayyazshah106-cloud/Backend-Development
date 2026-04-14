//for only h1
// const http = require('http');
// http.createServer((req,resp)=>{
//   resp.setHeader("Content-Type","text/html");
//   resp.write("<h2>Response</h2>")
// resp.end();
// }).listen(4800);

//for h2 or more html
// const http = require('http');
// http.createServer((req,resp)=>{
//   resp.setHeader("Content-Type","text/json");
//   resp.write("<h2>Response</h2>")
// resp.end();
// }).listen(4800);

// html pass karna
// const http = require('http');
// http.createServer((req,resp)=>{
//   resp.setHeader("Content-Type","text/html");
//   resp.write(`<html>
//     <head>
//   <title>more html</title>
//     <head/>
//     <body>
//     code step by step</body>
//     </html>`)
// resp.end();
// }).listen(4800);

// variable aur function passs karna
// const age = 34;
// const http = require('http');
// http.createServer((req,resp)=>{
//   resp.setHeader("Content-Type","text/html");
//   resp.write(`<html>
//     <head>
//   <title>more html</title>
//     <head/>
//     <body><h1>`+age+`</h1>
//     <h1>`+new Date()+`</h1></body>
//     </html>`)
// resp.end();
// process.exit()
// }).listen(4800);