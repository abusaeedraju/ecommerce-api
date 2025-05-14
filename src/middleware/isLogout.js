const jwt = require("jsonwebtoken");
const SECRET_KEY = "dhfuijewoy8734794hfiu489";
const isLoggedOut = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, SECRET_KEY);
      if (decodedToken) {
        return res.status(401).send("Already LoggedIn");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  next();
};
module.exports = { isLoggedOut };
