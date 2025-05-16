import Message from "../models/message.js";

export const getChatMessages = async (req, res) => {
  const { recipientId } = req.params;
  const senderId = req.user._id;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    }).sort("createdAt");

    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const sendMessage = async (req, res) => {
  const { recipientId, message } = req.body;
  const senderId = req.user._id;

  if (!recipientId || !message) {
    return res.status(400).json({ error: "Missing recipient or message" });
  }

  try {
    const newMessage = new Message({
      senderId,
      recipientId,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: newMessage });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};
