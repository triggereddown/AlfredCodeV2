const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    // Checking if cookies is undefined
    const token = req.cookies?.token;
    console.log("Token from cookies:", token);

    if (!token) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decoded);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.id = decoded.userId; // attach userId to request so that we can use it in other routes
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ message: "Token verification failed" });
  }
};

module.exports = { isAuthenticated };
