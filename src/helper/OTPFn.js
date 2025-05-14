/*//prepare mail
const otp = Math.floor(Math.random() * 1000000);
const emailData = {
  email,
  subject: "Password Retrieve Email",
  html: `
<h2> Hello ${user.firstName} !</h2>
<p> Please provide this otp code : ${otp} to  activate your account  </p>
`,
};
//send mail using nodemailer

  await emailWithNodeMailer(emailData);
  
  const OTP = new Otp({otp})
  await OTP.save()
  return OTP
*/
const Otp = require("./OtpModel");
const emailWithNodeMailer = require("./nodemailer")
exports.OTPFn = async (email) => {
  const otp = Math.floor(Math.random() * 1000000);
  const OTP = await Otp.create({ otp, email });

  await emailWithNodeMailer(email, otp);
  return OTP
};
