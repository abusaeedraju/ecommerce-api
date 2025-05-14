const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "rtraju2016@gmail.com",
    pass: "rsgo kprs uprd lonp",
  },
});

const emailWithNodeMailer = async (email,otp) => {
  try {
    const mailOption = {
      from: "rtraju2016@gmail.com",
      to: email,
      subject: "Your OTP code",
      html: `
      <h2> Your OTP code</h2>
      <p> Please provide this otp code : ${otp} to  activate your account  </p>
      `,
    };
   const info= await transporter.sendMail(mailOption);
    console.log("message sent %s", info.response);
    return 
  } catch (error) {
    console.error("Error occurred while sending email : ", error);
    throw Error(error.message);
  }
};

module.exports = emailWithNodeMailer;



/*const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "rtraju2016@gmail.com",
    pass: "rsgo kprs uprd lonp",
  },
});

const emailWithNodeMailer = async (emailData) => {
  try {
    const mailOption = {
      from: "rtraju2016@gmail.com",
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };
   const info= await transporter.sendMail(mailOption);
    console.log("message sent %s", info.response);
  } catch (error) {
    console.error("Error occured while sending email : ", error);
    throw error;
  }
};

module.exports = emailWithNodeMailer;

const nodemailer = require('./nodeMailer')
exports.nodeMailer = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
            user: 'rtraju2016@gmail.com', // Your email address
            pass: "rsgo kprs uprd lonp" // Your email password
        }
    });

    // Set up email data
    const mailOptions = {
        from: '"Boffo" <rtraju2016@gmail.com>', // Sender address
        to: email, // List of receivers
        subject: 'Your OTP Code', // Subject line
        // text: `Your OTP code is ${otp}` // Plain text body
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333;">Your OTP Code</h2>
                    <p style="font-size: 16px; color: #555;">Hello,</p>
                    <p style="font-size: 16px; color: #555;">Your OTP code is:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <span style="font-size: 24px; font-weight: bold; color: #333; padding: 10px 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">${otp}</span>
                    </div>
                    <p style="font-size: 16px; color: #555;">Please use this code to complete your verification. This code is valid for 10 minutes.</p>
                    <p style="font-size: 16px; color: #555;">If you did not request this code, please ignore this email.</p>
                    <p style="font-size: 16px; color: #555;">Thank you,</p>
                    <p style="font-size: 16px; color: #555;">The EcomGrove Team</p>
                </div>` // HTML body
    };

    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
}*/