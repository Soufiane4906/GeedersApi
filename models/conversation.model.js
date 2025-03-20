import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    AmbassadorId: {
      type: String,
      required: true,
    },
    GuestId: {
      type: String,
      required: true,
    },
    readByAmbassador: {
      type: Boolean,
      required: true,
    },
    readByGuest: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);
