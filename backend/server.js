const app = require("./src/app");
const connectdb = require("./src/config/database.js");
const userRoute = require("./src/routes/userRoutes.js");
require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 3000;

//Middleware to pass body
app.use(express.json());

//http://localhost:3000/api/v1/user/register

app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRoute);
app.listen(port, () => {
  connectdb();
  console.log(`Server is running on port ${port}`);
});
