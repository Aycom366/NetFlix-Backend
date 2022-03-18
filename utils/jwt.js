const jwt = require("jsonwebtoken");

const createJwt = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "5d" });
};

//verifying the token, verifying the token coming from req
const isTokenValid = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { createJwt, isTokenValid };
