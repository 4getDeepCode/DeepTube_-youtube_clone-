import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRouter from './routes/authRoutes.js'


dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
   origin:process.env.FRONTEND_url,
   credentials:true
}))




app.use("/api/auth",authRouter)

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`Server is runnig on port ${port}`);
  connectDB();
});
