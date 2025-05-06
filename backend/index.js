import { configDotenv } from "dotenv";
import express from "express";
import { connectDb } from "./db/connectDB.js";
import cors from "cors";
import authroute from "./routes/authroute.js";
import userRoutes from "./routes/userRoute.js";
import postroute from "./routes/postroute.js"
import cookieParser from "cookie-parser";
import path from "path";
import exp from "constants";

configDotenv();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authroute);
app.use("/api/users", userRoutes);
app.use("/api/post", postroute)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
  connectDb();
});
