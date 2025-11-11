const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Липсва токен." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("role");

    if (!user) {
      return res.status(401).json({ message: "Потребителят не съществува." });
    }

    req.user = {
      id: user._id.toString(),
      isAdmin: user.role === "admin"
    };

    next();
  } catch (error) {
    return res.status(403).json({ message: "Невалиден токен." });
  }
};

module.exports = authenticateToken;