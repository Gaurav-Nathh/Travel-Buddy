import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthUser } from "../queries/authQueries";

const socketURL =
  import.meta.env.MODE === "development" ? "http://localhost:8000" : "";
const socket = io(socketURL, { withCredentials: true });

const ChatBox = ({ recipient, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const chatBoxRef = useRef(null);

  const { data: sender, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  useEffect(() => {
    if (!sender || !recipient) return;

    const roomId = [sender._id, recipient._id].sort().join("_");
    socket.emit("join", roomId);

    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(`/chat/${recipient._id}`);
        setMessages(res.data.messages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();

    const handleMessage = (msg) => {
      const participants = [msg.senderId, msg.recipientId];
      if (
        participants.includes(sender._id) &&
        participants.includes(recipient._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [sender, recipient]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim() || !sender) return;

    const messageData = {
      senderId: sender._id,
      recipientId: recipient._id,
      message: newMsg,
    };

    socket.emit("send-message", messageData);
    setNewMsg("");
  };

  if (isLoading) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white border border-gray-300 rounded-2xl shadow-2xl w-full max-w-xl h-[70vh] flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        <h4 className="font-semibold text-lg">{recipient.name}</h4>
        <button
          onClick={onClose}
          className="text-sm bg-white text-red-500 px-3 py-1 rounded-full hover:bg-red-100 transition"
        >
          ✕
        </button>
      </div>

      {/* Chat messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-gray-50"
        ref={chatBoxRef}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-4 py-2 rounded-2xl text-lg shadow-sm ${
              msg.senderId === sender._id
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-900 self-start mr-auto"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="flex items-center gap-2 p-4 border-t bg-white">
        <input
          type="text"
          placeholder="Message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
