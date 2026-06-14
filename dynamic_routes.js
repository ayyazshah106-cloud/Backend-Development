// import express from "express";

// // Create express app
// const app = express();


// // Root Route
// app.get("/", (req, resp) => {

//   // Array of users
//   const users = ["ayyaz", "nawaz", "Aqsa","mohsin","mateen"];

//   // Start HTML unordered list
//   let data = `<ul>`;

//   // Loop through users array
//   for (let i = 0; i < users.length; i++) {

//     // Create dynamic user links
//     data += `
//       <li>
//         <a href="/user/${users[i]}">
//           ${users[i]}
//         </a>
//       </li>
//     `;
//   }

//   // Close unordered list
//   data += `</ul>`;

//   // Send HTML response
//   resp.send(data);
// });


// // Dynamic User Route
// app.get("/user/:name", (req, resp) => {

//   // Get username from URL params
//   const userName = req.params.name;
//   // userName.toUpperCase();
  

//   // Send dynamic response
//   resp.send(`This is ${userName} page`);
// });


// // Start server on port 3200
// app.listen(3200, () => {

//   console.log("Server running on port 3200");

// });