const bcrypt = require("bcryptjs");
const User = require("./userModel");
const { getUserIdFromToken } = require("../../config/jwtProvider");
const emailWithNodeMailer = require("../../helper/nodemailer");
const Otp = require("../../helper/OtpModel");
const { OTPFn } = require("../../helper/OTPFn");
const { OTPVerify } = require("../../helper/OTPVerify");

const createUser = async (userData) => {
  try {
    let { name, email, password, role } = userData;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("user already exist with this email!");
    }
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId); //.populate("address");
    if (!user) {
      throw new Error("user not found");
    }

    return user;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUserProfileByToken = async (token) => {
  try {
    const userId = getUserIdFromToken(token);
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegEex = new RegExp(".*" + search + ".*", "i");

    const filter = {
      role: { $eq: "customer" },
      $or: [
        { firstName: { $regex: searchRegEex } },
        { lastName: { $regex: searchRegEex } },
        { email: { $regex: searchRegEex } },
        { phone: { $regex: searchRegEex } },
      ],
    };
    const options = { password: 0, __v: 0 };
    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find(filter).countDocuments();
    if (!users) {
      throw new Error("User is empty");
    }
    return (payload = {
      message: "User were returned",
      users,
      pagination: {
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePassword = async (req) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;
  const token = req.cookies.token;
  const userId = getUserIdFromToken(token);
  const user = await User.findById(userId);
  if (!user) {
    return Error("token not found");
  }
  if (newPassword !== confirmPassword) {
    throw Error("newPassword and ConfirmPassword does not match");
  }
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw Error("Old password is incorrect");
  }
  const hash = await bcrypt.hash(newPassword, 10);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { password: hash },
    { new: true }
  );
  return updatedUser;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw Error("User not exist");
  }
  OTPFn(email);
  return;
};

const resetPassword = async (otp, password, email) => {
  /*
  const isExistOtp = await Otp.findOne({ otp });
  if (!isExistOtp) {
    throw Error("OTP is expired");
  }
  const user = await User.findOne({ email });
  console.log(user); 
  if (!user) {
    throw Error("Incorrect Email");
  }*/try {
    OTPVerify(otp, email);
  const hash = await bcrypt.hash(password, 10);
  const newPassword = await User.findOneAndUpdate(
    { email },
    { password: hash },
    { new: true }
  );
  return newPassword;
  } catch (error) {
    throw Error(error.message)
  }
  
};
module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
  updatePassword,
  forgotPassword,
  resetPassword,
};
