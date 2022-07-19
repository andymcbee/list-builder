import Message from "../models/message.js";
import mongoose from "mongoose";

//-----create Message-----

export const createMessage = async (req, res) => {
  console.log("MESSAGES API WAS HIT. CREATE MESSAGE.");

  const { headline, message } = req.body;

  const { accountId } = req.params;

  console.log(req.body);
  console.log(req.params);
  if (!headline) {
    return res
      .status(409)
      .json({ message: "Please provide a headline", error: true });
  }

  if (!message) {
    return res
      .status(409)
      .json({ message: "Please provide a message", error: true });
  }

  const newMessage = await Message.create({
    headline,
    message,
    accountId,
  });

  return res
    .status(200)
    .json({ messageObject: newMessage, message: "success", error: false });
};

//-----update Message-----

export const updateMessage = async (req, res) => {
  const { headline, message } = req.body;
  const { id } = req.params;

  console.log(headline);
  console.log(message);
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No message matches ID" });
  }

  const existingMessage = await Message.findOne({ _id: id });

  const updatedMessage = await Message.findOneAndUpdate(
    { _id: id },
    { headline, message },
    { new: true }
  );

  return res
    .status(200)
    .json({ messageObject: updatedMessage, message: "success", error: false });
};

//-----find one Message by ID-----
export const findMessage = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const existingMessage = await Message.findOne({ _id: id });

  return res
    .status(200)
    .json({ messageObject: existingMessage, message: "success", error: false });
};
