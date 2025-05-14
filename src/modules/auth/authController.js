const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require("../user/userService");
const { errorResponse, successResponse } = require("../../helper/responseHandler");
const { createCart } = require("../product/cartService");
const { generateToken } = require("../../config/jwtProvider");

const register = async (req, res, next) => {
  try {
    const user = (await createUser(req.body));
    await createCart(user);
    return successResponse(res, {
      statusCode: 200,
      message: "register successful",
    },user);
  } catch (error) {
    console.log(error);
    return errorResponse(res, { statusCode: 401, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return errorResponse(res, { statusCode: 404, message: "user not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, {
        statusCode: 401,
        message: "invalid password...",
      });
    }
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = generateToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "none",
      maxAge: 86400000, // 24 hour 24*60*60*1000
    });
    return successResponse(res, {
      statusCode: 200,
      message: "login successful",
    });
  } catch (error) {
    return errorResponse(res, { statusCode: 500, message: error.message });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return successResponse(res, {
      statusCode: 200,
      message: "logout successful",
    });
  } catch (error) {
    return errorResponse(res, { statusCode: 500, message: error.message });
  }
};

module.exports = { register, login, logout };
