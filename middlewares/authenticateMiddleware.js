const { isTokenValid } = require("../utils/jwt");

const authenticateMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = isTokenValid(token);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

const authorizePermissions = (isAdmin) => {
  return (req, res, next) => {
    if (!req.user.isAdmin === isAdmin) {
      return res.status(401).json({ msg: "Unauthorized to access this route" });
    }
    next();
  };
};

module.exports = { authenticateMiddleware, authorizePermissions };
