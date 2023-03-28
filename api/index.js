const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Keep this the last requirement
// Connecting to Database
require("./utils/connectDatabase").connect();

const app = express();
const PORT = process.env.PORT || 6900;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// function startServer() {
//   const server = app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });

//   server.on('error', (err) => {
//     if (err.code === 'EADDRINUSE') {
//       // Port is already in use, choose another available port
//       PORT++;
//       startServer();
//     } else {
//       console.error(err);
//     }
//   });
// }

// startServer();