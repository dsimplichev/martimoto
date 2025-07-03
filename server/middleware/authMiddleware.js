const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Не си логнат. Липсва токен." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
     console.log("Decoded JWT:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
     console.log("Грешка при верифициране на токена:", error);
    return res.status(403).json({ message: "Невалиден или изтекъл токен." });
  }
};

module.exports = authenticateToken;