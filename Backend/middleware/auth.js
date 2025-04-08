const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).send({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded; // stocke l’ID de l’utilisateur dans req.user
    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid token." });
  }
};
