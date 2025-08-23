const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Validation for all fields
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validation for password
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password doesn't match" });
    }

    // Check for user
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    await User.create({
      fullName,
      username,
      password: hashedPassword,
      gender,
    });

    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Export CommonJS style
module.exports = register;



