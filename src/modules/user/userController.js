//const emailWithNodeMailer = require("../../helper/nodemailer");
const { successResponse, errorResponse } = require("../../helper/responseHandler");
const {
  getUserProfileByToken,
  getAllUsers,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("./userService");

exports.getUserProfile = async (req, res) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(404).send("token not found");
    }
    const user = await getUserProfileByToken(token);
    if (!user) {
      return res.status(404).send("user not found");
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await getAllUsers(req, res);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
};

exports.updatePasswordById = async (req, res) => {
  try {
    const updatedUser = await updatePassword(req);

    return successResponse(res, {
      statusCode: 200,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = await forgotPassword(email);

    return successResponse(res, {
      statusCode: 200,
      message: `please go to your email ${email} for completing your password retrieve process`,
    });
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { otp, password, email } = req.body;
    const newPassword = await resetPassword(otp, password, email);
    if (!newPassword) {
      throw Error("password reset fail");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Password created successfully",
    });
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
};
