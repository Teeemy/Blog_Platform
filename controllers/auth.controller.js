const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
  const { firstName, lastName, userName, email, password, role = "user", ...others } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      role: role.toLowerCase(), // store role in lowercase
      ...others,
    });

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production with HTTPS
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName,
        lastName,
        userName,
        email,
        role: newUser.role,
        ...others
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login existing user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Account does not exist" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid password" });

    // Generate token using user's role (lowercase)
    const token = jwt.sign(
      { id: user._id, role: user.role.toLowerCase() },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role.toLowerCase(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, logout };
