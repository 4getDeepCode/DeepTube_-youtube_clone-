import "dotenv/config";
import express from "express";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import contentRouter from './routes/contentRoutes.js'
import shortRouter from './routes/shortRoutes.js'

const port = process.env.PORT;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
   origin:process.env.FRONTEND_URL,
   credentials:true
}))




app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/content",contentRouter)
app.use("/api/short",shortRouter)

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`Server is runnig on port ${port}`);
  connectDB();
});
