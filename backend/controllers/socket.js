import { Server } from "socket.io";
import Message from "../models/message.js";

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", (roomId) => {
      socket.join(roomId);
    });

    socket.on("send-message", async (data) => {
      try {
        const { senderId, recipientId, message } = data;
        const newMsg = await Message.create({
          senderId,
          recipientId,
          message,
        });

        const roomId = [senderId, recipientId].sort().join("_");
        io.to(roomId).emit("message", newMsg);
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });

    socket.on("disconnect", () => {});
  });
};
