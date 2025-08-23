const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const app = express();
const cors = require("cors");

app.use(cors());

// middleware used if we need req.body sincse we are using post route so we need this
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Entry point of our app!");
});

app.use("/ai", aiRoutes); // Working after export fix ✅

module.exports = app;
