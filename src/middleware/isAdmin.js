const isAdmin = async (req, res, next) => {
  const user = await req.user;
  if (user.role === "admin") {
    next();
  } else {
    return res.status(403).send("You have to be admin to access here");
  }
};
module.exports = isAdmin;
