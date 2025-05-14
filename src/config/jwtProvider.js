const jwt = require("jsonwebtoken");

const SECRET_KEY = "dhfuijewoy8734794hfiu489";

const generateToken = (payload) => {
  const token = jwt.sign(payload , SECRET_KEY, { expiresIn: "24h" });
  return token;
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken._id;
};

module.exports = { generateToken, getUserIdFromToken };
