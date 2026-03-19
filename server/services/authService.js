import uploadOnCloudinary from "../config/cloudinary.js";
import sendEmail from "../config/sendEmail.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";

// 🔐 SIGNUP SERVICE
export const signupService = async (data, file) => {
  const { username, email, password } = data;

  let photoUrl;

  if (file) {
    photoUrl = await uploadOnCloudinary(file.path);
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new Error("User already exists");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
    photoUrl,
  });

  return user;
};

// 🔐 SIGNIN SERVICE
export const signinService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Incorrect password");

  return user;
};

// 🔐 GOOGLE AUTH
export const googleAuthService = async (data) => {
  const { username, email, photoUrl } = data;

  let finalPhotoUrl = photoUrl;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      username,
      email,
      photoUrl: finalPhotoUrl,
    });
  }

  return user;
};

// 🔐 SEND OTP
export const sendOtpService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  user.resetOtp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;
  user.isOtpVerified = false;

  await user.save();

  await sendEmail(email, otp);

  return true;
};

// 🔐 VERIFY OTP
export const verifyOtpService = async (email, otp) => {
  const user = await User.findOne({ email });

  if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
    throw new Error("Invalid OTP");
  }

  user.isOtpVerified = true;
  user.resetOtp = undefined;
  user.otpExpires = undefined;

  await user.save();

  return true;
};

// 🔐 RESET PASSWORD
export const resetPasswordService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !user.isOtpVerified) {
    throw new Error("OTP verification required");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user.password = hashPassword;
  user.isOtpVerified = false;

  await user.save();

  return true;
};
