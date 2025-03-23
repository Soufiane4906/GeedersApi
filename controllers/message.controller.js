import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const createMessage = async (req, res, next) => {
  try {
    const { conversationId, desc, type = 'text', fileUrl, duration, location } = req.body;

    // Create message object with dynamic fields
    const messageData = {
      conversationId,
      userId: req.userId,
      desc,
      type
    };

    // Add optional fields based on message type
    if (type === 'audio' && duration) {
      messageData.duration = duration;
    }

    if (['audio', 'image', 'file'].includes(type) && fileUrl) {
      messageData.fileUrl = fileUrl;
    }

    if (type === 'location' && location) {
      messageData.location = location;
    }

    const newMessage = new Message(messageData);
    const savedMessage = await newMessage.save();

    // Update conversation with last message
    await Conversation.findOneAndUpdate(
        { id: conversationId },
        {
          $set: {
            readByAmbassador: req.isAmbassador,
            readByGuest: !req.isAmbassador,
            lastMessage: desc,
            lastMessageType: type,
            lastMessageTime: new Date()
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
        user: user || { img: "https://via.placeholder.com/40", username: "Unknown" }
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

    // Mark messages as read if current user is not the sender
    if (messages.length > 0) {
      await Message.updateMany(
          {
            conversationId: req.params.id,
            userId: { $ne: req.userId },
            'readBy.userId': { $ne: req.userId }
          },
          {
            $set: { status: 'read' },
            $push: { readBy: { userId: req.userId, readAt: new Date() } }
          }
      );

      // Update conversation read status
      const readField = req.isAmbassador ? 'readByAmbassador' : 'readByGuest';
      await Conversation.updateOne(
          { id: req.params.id },
          { $set: { [readField]: true } }
      );
    }

    res.status(200).json({
      messages: messagesWithUserDetails,
      Guest: Guest || { img: "https://via.placeholder.com/40", username: "Unknown", email: "", phone: "" },
      Ambassador: Ambassador || { img: "https://via.placeholder.com/40", username: "Unknown", email: "", phone: "" }
    });
  } catch (err) {
    next(err);
  }
};

export const translateMessage = async (req, res, next) => {
  try {
    const { messageId, targetLanguage } = req.body;

    if (!messageId || !targetLanguage) {
      return next(createError(400, "Message ID and target language are required"));
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return next(createError(404, "Message not found"));
    }

    // Check if translation already exists
    const existingTranslation = message.translations.find(
        t => t.language === targetLanguage
    );

    if (existingTranslation) {
      return res.status(200).json({
        messageId,
        translatedText: existingTranslation.text,
        language: targetLanguage
      });
    }

    // In a real app, you would call a translation API here
    // For demo purposes, we'll simulate a translation with a prefix
    const translatedText = `[${targetLanguage}] ${message.desc}`;

    // Save the translation to the message
    message.translations.push({
      language: targetLanguage,
      text: translatedText
    });

    await message.save();

    res.status(200).json({
      messageId,
      translatedText,
      language: targetLanguage
    });
  } catch (err) {
    next(err);
  }
};

export const markMessageAsRead = async (req, res, next) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      return next(createError(404, "Message not found"));
    }

    // Check if user has already read the message
    const alreadyRead = message.readBy.some(
        read => read.userId === req.userId
    );

    if (!alreadyRead) {
      // Add user to readBy array
      message.readBy.push({
        userId: req.userId,
        readAt: new Date()
      });

      // Update status if all conversation participants have read it
      const conversation = await Conversation.findOne({ id: message.conversationId });
      const participantIds = [conversation.GuestId, conversation.AmbassadorId].map(id => id.toString());

      if (message.readBy.length >= participantIds.length) {
        message.status = 'read';
      } else {
        message.status = 'delivered';
      }

      await message.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const uploadMessageFile = async (req, res, next) => {
  try {
    // Note: This would require file upload middleware like multer
    // For this example, we're assuming the file is already uploaded and the URL is provided
    if (!req.file && !req.body.fileUrl) {
      return next(createError(400, "No file uploaded"));
    }

    const fileUrl = req.file ?
        `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` :
        req.body.fileUrl;

    res.status(200).json({ fileUrl });
  } catch (err) {
    next(err);
  }
};

export const shareLocation = async (req, res, next) => {
  try {
    const { latitude, longitude, address, conversationId } = req.body;

    if (!latitude || !longitude || !conversationId) {
      return next(createError(400, "Latitude, longitude, and conversation ID are required"));
    }

    const newMessage = new Message({
      conversationId,
      userId: req.userId,
      desc: address || "Location shared",
      type: 'location',
      location: {
        latitude,
        longitude,
        address
      }
    });

    const savedMessage = await newMessage.save();

    // Update conversation
    await Conversation.findOneAndUpdate(
        { id: conversationId },
        {
          $set: {
            readByAmbassador: req.isAmbassador,
            readByGuest: !req.isAmbassador,
            lastMessage: "Location shared",
            lastMessageType: 'location',
            lastMessageTime: new Date()
          },
        },
        { new: true }
    );

    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};