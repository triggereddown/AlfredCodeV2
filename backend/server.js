const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectdb = require("./src/config/database.js");
const userRoute = require("./src/routes/userRoutes.js");
const aiRoutes = require("./src/routes/ai.routes.js");
const messageRoute = require("./src/routes/messageRoute.js");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  //includend the frontend url
  origin: ["http://localhost:5173", "https://gothamaichat-gamma.vercel.app/"], // frontend URLs
  credentials: true, // allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Optional: handle preflight globally
// app.options("*", cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
app.use("/ai", aiRoutes);

// Test root route
app.get("/", (req, res) => res.send("Backend is running"));

// Start server
app.listen(port, () => {
  connectdb();
  console.log(`Server running on port ${port}`);
});
