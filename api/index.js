// third-party modules
const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const errorLog = require("./utils/errorLog");

// Load environment variables from .env file: Keep this the first requirement
require("dotenv").config();

// Uncaught Exceptions For Synchronous Code
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception. Shutting Down");
  errorLog(err);
  process.exit(1);
});

// Connecting to Database
require("./utils/connectDatabase").connect();

// CODE BEGINS HERE
const app = express();

// Middlewares
// Sets security HTTP headers
app.use(helmet());
// Limit requests from same IP to our api
app.use(
  "/api",
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP",
  })
);
// Middleware to parse body into req.body
app.use(express.json({ limit: "10kb" }));
// Data sanitisation against NoSQL query injection -> "email" : { "$gt" : ""}, we need to prevent this
app.use(mongoSanitize());
// Data sanitisation against XSS attacks
app.use(xss());

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

// Unhandled Rejection for Failed Promises
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection. Shutting Down");
  errorLog(err);
  server.close(() => {
    process.exit(1);
  });
});
