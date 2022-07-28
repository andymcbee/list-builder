import express from "express";
import {
  createMessage,
  updateMessage,
  findMessage,
  checkMessageAccess,
  replacePageId,
} from "../controllers/messagesController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//create new message
router.post("/create/:accountId", auth, createMessage);

//update message
router.post("/update/:id", auth, updateMessage);

//find message
router.get("/:accountId", auth, findMessage);

//Public. Check if message pageId is valid and return error if not.
router.get("/access/:pageId", checkMessageAccess);

//Replace pageId with new unique pageId
router.post("/replacePageId/:id", auth, replacePageId);

export default router;
