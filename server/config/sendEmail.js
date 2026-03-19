import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD, // App Password
  },
});

const sendEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"DeepTube Support" <${process.env.USER_EMAIL}>`,
      to,
      subject: "Reset Your Password",
      html: `
        <h3>Password Reset OTP</h3>
        <p>Your OTP is: <b>${otp}</b></p>
        <p>This OTP expires in 5 minutes.</p>
      `,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email Error:", error.message);
    throw error;
  }
};

export default sendEmail;
