import Message from "../models/message.js";
import mongoose from "mongoose";
import { uid } from "uid";

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

  //generate unique number until true unique is found (in message's table (pageId))
  const generateUniquePageId = async () => {
    let randomNum = uid();

    const existingPageId = await Message.findOne({
      accountId: randomNum,
    });
    if (existingPageId) {
      generateUniqueAccountId();
    } else {
      return randomNum;
    }
  };

  let pageUniqueId = await generateUniquePageId();

  const newMessage = await Message.create({
    headline,
    message,
    accountId,
    pageId: pageUniqueId,
  });

  return res
    .status(200)
    .json({ messageObject: newMessage, message: "success", error: false });
};

//-----update Message-----

export const updateMessage = async (req, res) => {
  const { headline, message } = req.body;
  const { id } = req.params;

  console.log(req.params);

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

//-----find one Message by Account ID-----
export const findMessage = async (req, res) => {
  const { accountId } = req.params;
  console.log(accountId);
  console.log("TEST");

  const existingMessage = await Message.findOne({ accountId: accountId });

  return res
    .status(200)
    .json({ messageObject: existingMessage, message: "success", error: false });
};

//-----find one Message by pageId and return if access is allowed-----
export const checkMessageAccess = async (req, res) => {
  const { pageId } = req.params;
  console.log(pageId);

  const existingMessage = await Message.findOne({ pageId: pageId });

  console.log(existingMessage);

  if (!existingMessage) {
    return res.status(409).json({
      message: "Access denied",
      error: true,
    });
  }

  if (existingMessage) {
    return res.status(200).json({
      error: false,
      message: "Access allowed",
      returnedId: existingMessage.pageId,
    });
  }
};

//-----Create new random PageID for Message-----

export const replacePageId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No message matches ID" });
  }

  //generate unique number until true unique is found (in message's table (pageId))
  const generateUniquePageId = async () => {
    let randomNum = uid();

    const existingPageId = await Message.findOne({
      accountId: randomNum,
    });
    if (existingPageId) {
      generateUniqueAccountId();
    } else {
      return randomNum;
    }
  };

  let newUniquePageId = await generateUniquePageId();

  const updatedMessage = await Message.findOneAndUpdate(
    { _id: id },
    { pageId: newUniquePageId },
    { new: true }
  );

  return res
    .status(200)
    .json({ messageObject: updatedMessage, message: "success", error: false });
};
