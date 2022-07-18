import express from "express";
import {
  createMessage,
  updateMessage,
  findMessage,
} from "../controllers/messagesController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//create new message
router.post("/create/:teamId", auth, createMessage);

//update new message
router.put("/update/:id", auth, updateMessage);

//find message
router.get("/:id", auth, findMessage);

export default router;
