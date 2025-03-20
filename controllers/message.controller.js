import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";


export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readByAmbassador: req.isAmbassador,
          readByGuest: !req.isAmbassador,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });

    // Get unique user IDs from messages
    const userIds = [...new Set(messages.map(message => message.userId))];
    const users = await User.find({ _id: { $in: userIds } });

    // Map user data to each message
    const messagesWithUserDetails = messages.map(message => {
      const user = users.find(user => user._id.toString() === message.userId.toString());
      return {
        ...message.toObject(),
        user: user || { img: "https://via.placeholder.com/50", username: "Unknown" } // Default values if user not found
      };
    });

    // Fetch conversation details to get Guest and Ambassador details
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) {
      return res.status(404).send('Conversation not found');
    }

    // Fetch Guest and Ambassador details
    const [Guest, Ambassador] = await Promise.all([
      User.findById(conversation.GuestId),
      User.findById(conversation.AmbassadorId)
    ]);

    res.status(200).json({
      messages: messagesWithUserDetails,
      Guest: Guest || { img: "https://via.placeholder.com/100", username: "Unknown", email: "", phone: "" },
      Ambassador: Ambassador || { img: "https://via.placeholder.com/100", username: "Unknown", email: "", phone: "" }
    });
  } catch (err) {
    next(err);
  }
};
