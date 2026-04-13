// core modules

const fs = require("fs");
const os = require('os');
fs.writeFileSync("dummy.txt","learning core modules")


console.log(os.platform());
console.log(os.hostname());
console.log(os.cpus());

