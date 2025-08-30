const app = require("./src/app");
const connectdb = require("./src/config/database.js");
const userRoute = require("./src/routes/userRoutes.js");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");

const port = process.env.PORT || 3000;

//Middleware to pass body
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//http://localhost:3000/api/v1/user/register

app.use("/api/v1/user", userRoute);
app.listen(port, () => {
  connectdb();
  console.log(`Server is running on port ${port}`);
});
