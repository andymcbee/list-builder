import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  message: { type: String, required: true },
  accountId: { type: String, required: true },
  pageId: { type: String, required: true },

  id: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
