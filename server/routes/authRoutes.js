import express from "express";
import {
  googleAuth,
  resetPassword,
  sendOTP,
  signin,
  signOut,
  signUp,
  verifyOTP,
} from "../controllers/authController.js";
import upload from "../middlewares/multer.js";

const authRouter = express.Router();

//  Auth
authRouter.post("/signup", upload.single("photoUrl"), signUp);
authRouter.post("/signin", signin);
authRouter.post("/signout", signOut);

//  Google Auth
authRouter.post("/google-auth", googleAuth);

//  OTP System
authRouter.post("/send-otp", sendOTP);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
