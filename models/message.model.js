import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
  conversationId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'audio', 'location', 'image', 'file'],
    default: 'text'
  },
  fileUrl: {
    type: String,
    default: null
  },
  duration: {
    type: Number,
    default: null
  },
  location: {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    address: { type: String, default: null }
  },
  translations: [{
    language: { type: String },
    text: { type: String }
  }],
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  readBy: [{
    userId: { type: String },
    readAt: { type: Date }
  }]
},{
  timestamps: true
});

export default mongoose.model("Message", MessageSchema);