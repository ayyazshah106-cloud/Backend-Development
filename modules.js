core modules

const fs = require("fs");
const os = require('os');
fs.writeFileSync("dummy.txt","learning core modules")




console.log(os.platform());
console.log(os.hostname());
console.log(os.cpus());

global Objects

console.log("abc");
console.log(process.cwd());


make forcely into custom objects
const {log,warn}= require("console");
log("custom log");
warn("custom log");
console.warn(process.pid);