import express from "express";
import {
  getCommSends,
  getCommSend,
  createCommSend,
  updateCommSend,
  deleteCommSend,
} from "../controllers/commSendsController.js";

const router = express.Router();

//get all
router.get("/", getCommSends);

//get one
router.get("/:id", getCommSend);

//create
router.post("/create", createCommSend);

//update
router.put("/update/:id", updateCommSend);

//delete

router.delete("/delete/:id", deleteCommSend);

export default router;
