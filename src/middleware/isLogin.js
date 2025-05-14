const { getUserIdFromToken } = require("../config/jwtProvider");
const userService = require("../modules/user/userService");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("token not found");
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      return res.status(401).send("Invalid token, Login again");
    }
    const user = userService.getUserById(userId);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};
module.exports = { isLoggedIn };
