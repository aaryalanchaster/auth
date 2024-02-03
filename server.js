const express = require("express");
const { connectDB } = require("./config/database");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;

// Instantiating the mongodb database
connectDB();

// Instantiating the express application

const server = express();

server.get("/", (req, res) => {
  return res.json({
    message: "This the Home page",
  });
});

// Importing our routes
const user = require("./routes/user.route");

// Express Inbuilt middleware

server.use(express.json()); // Used in passing application/json data
server.use(express.urlencoded({ extended: false })); // Used in passing form
server.use(cookieParser()); // Used in setting the cookies parser

// Routes for API

server.use("/api/v1", user);

// Creating the server
server.listen(PORT, () => console.log("Server is running on port " + PORT));
