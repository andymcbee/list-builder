import express from "express";
import {
  createMessage,
  updateMessage,
  findMessage,
} from "../controllers/messagesController.js";

const router = express.Router();

//create new message
router.post("/create/:teamId", createMessage);

//update new message
router.put("/update/:id", updateMessage);

//find message
router.get("/:id", findMessage);

export default router;
