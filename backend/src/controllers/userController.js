const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword } = req.body;

    if (!fullName || !username || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
    });

    // Optional cookie
    res.cookie("user", username, {
      httpOnly: true,
      secure: false, // true if HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });

    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // return res
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     sameSite: "strict",
    //     maxAge: 24 * 60 * 60 * 1000,
    //   })
    //   .status(200)
    //   .json({
    //     success: true,
    //     message: "Login Successful",
    //     user: { username, fullName: user.fullName, _id: user._id },
    //   });
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none", // ✅ required for frontend hosted on a different domain
        secure: true, // ✅ required for Render (HTTPS)
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successful",
        token, // ✅ send token in response body too
        user: { username, fullName: user.fullName, _id: user._id },
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// LOGOUT
const logout = (req, res) => {
  try {
    return res
      .cookie("token", "", { maxAge: 0 })
      .status(200)
      .json({ success: true, message: "Logged out" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id; // assuming you set req.id in middleware
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    return res.status(200).json(otherUsers);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { register, login, logout, getOtherUsers };
