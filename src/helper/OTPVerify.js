const Otp = require("./OtpModel");
exports.OTPVerify = async (otp, email) => {
    try {
        const result = await Otp.findOne({ otp });
    if (!result) {
       throw new Error("OTP is expired, please request for new OTP");
    }
    if (result.email!==email) {
      throw new Error("Invalid Email");
    }
    return
    } catch (error) {
        throw new Error(error.message)
    }
    
};
