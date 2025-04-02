import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";


// En haut du fichier, après les imports existants
import { upload } from "../middleware/upload.js"; // Importez le middleware d'upload

// Modifiez la fonction uploadMessageFile pour utiliser multer
export const uploadMessageFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(createError(400, "No file uploaded"));
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ fileUrl });
  } catch (err) {
    next(err);
  }
};

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
    if (type === 'image' || type === 'file' || type === 'audio') {
      messageData.fileUrl = fileUrl;
    }

    if (type === 'audio' && duration) {
      messageData.duration = duration;
    }

    if (type === 'location' && location) {
      messageData.location = location;
    }

    // Create the message
    const newMessage = new Message(messageData);
    await newMessage.save();

    // Update the conversation's last message
    await Conversation.findByIdAndUpdate(conversationId, {
      $set: {
        lastMessage: desc.substring(0, 50) + (desc.length > 50 ? '...' : ''),
        updatedAt: new Date()
      }
    });

    res.status(201).json(newMessage);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id })
        .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify the user is part of the conversation
    const conversation = await Conversation.findById(id);
    if (!conversation) {
      return next(createError(404, "Conversation not found"));
    }

    if (conversation.sellerId.toString() !== req.userId &&
        conversation.buyerId.toString() !== req.userId) {
      return next(createError(403, "You are not authorized"));
    }

    // Mark all messages as read where userId is not the current user
    await Message.updateMany(
        {
          conversationId: id,
          userId: { $ne: req.userId },
          read: false
        },
        { $set: { read: true } }
    );

    res.status(200).send("Messages marked as read");
  } catch (err) {
    next(err);
  }
};

export const translateMessage = async (req, res, next) => {
  try {
    const { text, targetLanguage } = req.body;

    // Intégration avec un service de traduction
    // Ceci est un exemple simplifié - vous devriez utiliser un vrai service de traduction
    const translatedText = `Traduction de "${text}" en ${targetLanguage}`;

    res.status(200).json({ translatedText });
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



