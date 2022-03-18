const User = require("../models/User");

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ msg: "Please provide old and new password" });
  }

  const user = await User.findById(req.user._id);
  if (user.comparePassword(oldPassword)) {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      password: newPassword,
    });
    res.status(200).json({ msg: "Password updated successfully" });
  }
  res.status(400).json({ msg: "Invalid credentials" });
};

const updateUser = async (req, res) => {
  const { userName } = req.body;
  if (!userName) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (!req.params.id) {
    return res.status(400).json({ msg: "UserId not found" });
  }

  if (req.user._id === req.params.id) {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    user.userName = userName;
    await user.save();

    const { password, ...info } = user._doc;
    res.status(200).json({ msg: "User updated successfully", data: info });
  } else {
    return res
      .status(401)
      .json({ msg: "You are not authorized to update this user" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "UserId not found" });
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({ msg: "User deleted successfully" });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "UserId not found" });
  }
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  res.status(200).json({ msg: "User found", data: user });
};

const showCurrentUser = async (req, res) => {
  res.status(200).json({ msg: "User found", data: req.user });
};

const getAllUsers = async (req, res) => {
  const { query } = req.query;
  const users = query
    ? await User.find().select("-password -__v").limit(5)
    : await User.find().select("-password -__v");

  res.status(200).json({ msg: "Users found", data: users });
};

//total number of people permonth
const getUserStatistics = async (req, res) => {
  //getting users for last year
  const today = new Date();

  //the prject creates a new field called months of which the $month will return interger of the month
  //and we group each document with the id summing the no of times month occured
  const data = await User.aggregate([
    {
      $project: { month: { $month: "$createdAt" } },
    },
    { $group: { _id: "$month", total: { $sum: 1 } } },
  ]);
  res.status(200).json({ msg: "User statistics found", data });
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  updatePassword,
  getUserStatistics,
  showCurrentUser,
};
