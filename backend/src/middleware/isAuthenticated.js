const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    // check the token inside the cookies inside the request
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    // Uptill here we will get the decoded token in form of an object now we will assign the id
    // which is present in the decode object
    req.id = decode.userId;
    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = { isAuthenticated };
