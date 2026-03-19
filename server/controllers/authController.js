import genToken from "../config/token.js";
import {
  googleAuthService,
  resetPasswordService,
  sendOtpService,
  signinService,
  signupService,
  verifyOtpService,
} from "../services/authService.js";

// SIGNUP
export const signUp = async (req, res) => {
  try {
    const user = await signupService(req.body, req.file);

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// SIGNIN
export const signin = async (req, res) => {
  try {
    const user = await signinService(req.body.email, req.body.password);

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// SIGNOUT
export const signOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Signed out successfully" });
};

// GOOGLE AUTH
export const googleAuth = async (req, res) => {
  try {
    const user = await googleAuthService(req.body);

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// SEND OTP
export const sendOTP = async (req, res) => {
  try {
    await sendOtpService(req.body.email);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// VERIFY OTP
export const verifyOTP = async (req, res) => {
  try {
    await verifyOtpService(req.body.email, req.body.otp);

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    await resetPasswordService(req.body.email, req.body.password);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
