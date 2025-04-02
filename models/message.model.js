import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema(
    {
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
      read: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        enum: ['text', 'image', 'file', 'audio', 'location'],
        default: 'text',
      },
      fileUrl: {
        type: String,
      },
      duration: {
        type: Number,
      },
      location: {
        latitude: Number,
        longitude: Number,
      },
    },
    {
      timestamps: true,
    }
);

export default mongoose.model("Message", MessageSchema);
