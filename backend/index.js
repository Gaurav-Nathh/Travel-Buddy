// import { configDotenv } from "dotenv";
// import express from "express";
// import { connectDb } from "./db/connectDB.js";
// import cors from "cors";
// import authroute from "./routes/authroute.js";
// import userRoutes from "./routes/userRoute.js";
// import postroute from "./routes/postroute.js";
// import notificationRoute from "./routes/notification.route.js";
// import connectionRoute from "./routes/connection.route.js";
// import chatRoute from "./routes/chat.route.js";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { setupSocket } from "./controllers/socket.js";
// import http from "http";

// configDotenv();

// const app = express();
// const PORT = process.env.PORT;
// const __dirname = path.resolve();
// const server = http.createServer(app);
// setupSocket(server);

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.use(express.json({ limit: "10mb" }));
// app.use(cookieParser());

// app.use("/api/auth", authroute);
// app.use("/api/users", userRoutes);
// app.use("/api/post", postroute);
// app.use("/api/notifications", notificationRoute);
// app.use("/api/connections", connectionRoute);
// app.use("/api/chat", chatRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// app.listen(PORT, () => {
//   console.log(`Sever is running on port ${PORT}`);
//   connectDb();
// });
import { configDotenv } from "dotenv";
import express from "express";
import { connectDb } from "./db/connectDB.js";
import cors from "cors";
import authroute from "./routes/authroute.js";
import userRoutes from "./routes/userRoute.js";
import postroute from "./routes/postroute.js";
import notificationRoute from "./routes/notification.route.js";
import connectionRoute from "./routes/connection.route.js";
import chatRoute from "./routes/chat.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { setupSocket } from "./controllers/socket.js";
import http from "http";

configDotenv();

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();
const server = http.createServer(app);

// Setup socket.io with the server instance
setupSocket(server);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authroute);
app.use("/api/users", userRoutes);
app.use("/api/post", postroute);
app.use("/api/notifications", notificationRoute);
app.use("/api/connections", connectionRoute);
app.use("/api/chat", chatRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// IMPORTANT: listen on server, NOT app
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
