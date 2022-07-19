import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  status: { type: String, required: true },
  accountId: { type: String, required: true },
  dateSent: { type: Date },
  id: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
