//const authRouter = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName, email, password, ...others } = req.body;
  if (!email || !password) {
    return res.status(400).send("Please provide valid credentials");
  }

  try {
    const isexisting = await User.findOne({ email });
    if (isexisting) {
      return res.status(400).send("User already exists, Please login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      ...others,
    });

    // exclude password from response
    const { password: pwd, ...userWithoutPassword } = newUser._doc;
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    return res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // get the user from database
  const user = await User.findOne({ email });
  if (!user) {
    return res.send("Account does not exist,create account");
  }
  // compare password
  const isPassword = bcrypt.compareSync(password, user.password);
  if (!isPassword) {
    return res.send("Invalid passowrd!!!");
  }

  //create token
  const token = jwt.sign(
    { name: user.name, id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  ); // sign particular token by provinding info
  console.log(token);

  return res
    .cookie("userId", user.id, {
      maxAge: 1000 * 60 * 60,
      secure: true,
      httpOnly: true,
    })
    .json({ message: "Login successfully" });
};

module.exports = { register, login };
