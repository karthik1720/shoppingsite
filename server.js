import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router as authRoutes } from "./routes/authRoutes.js";
import { router as productsRoutes } from "./routes/productsRoutes.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());
// app.use(
//   cors({
//     origin:
//       "https://6379121451bb0c000878a47f--unique-muffin-54d003.netlify.app/",
//     credentials: true,
//   })
// );
app.use(cors());
app.use((req, res, next) => {
  console.log("cors ");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/user", userRoutes);
app.use(cookieParser());
const port = process.env.PORT;
const localPORT = process.env.SERVERPORT;
app.listen(port || localPORT, () => {
  console.log("Server listening to " + port);
});

const endpoint = process.env.DB;
mongoose.connect(endpoint, () => {
  console.log("Connected to DB");
});
