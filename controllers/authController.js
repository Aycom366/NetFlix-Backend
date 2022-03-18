const User = require("../models/User");
const createUser = require("../utils/createUser");
const { createJwt } = require("../utils/jwt");

const Register = async (req, res) => {
  const { userName, email, password } = req.body;

  console.log(req.body);

  if (!userName || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const user = await User.create(req.body);
  const { password: newpassword, ...info } = user._doc;

  //return only Id and isAdmin
  const newUser = createUser(info);

  const token = createJwt(newUser);

  res
    .status(201)
    .json({ msg: "User created successfully", data: { ...info, token } });
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }
  const checkPassword = await user.comparePassword(password);

  if (!checkPassword) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }

  //remove password and send userDetails
  const { password: newpassword, ...info } = user._doc;

  //return only Id and isAdmin
  const newUser = createUser(info);

  const token = createJwt(newUser);

  res.status(200).json({ msg: "Login successful", data: { ...info, token } });
};

module.exports = { Register, Login };
