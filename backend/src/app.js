const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const app = express();
const cors = require("cors");

app.use(cors());

// middleware used if we need req.body sincse we are using post route so we need this
app.use(express.json());

// app.use("/ai", aiRoutes);

module.exports = app;
