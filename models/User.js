const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: [true, "userName is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    password: { type: String, required: [true, "password is required"] },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (incomingPassword) {
  return bcrypt.compare(incomingPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
