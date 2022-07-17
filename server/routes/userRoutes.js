import express from "express";
import {
  getUser,
  createUser,
  createAccountOwnerUser,
} from "../controllers/usersController.js";

const router = express.Router();

//get one
router.get("/:id", getUser);

//create user
router.post("/create/:teamId", createUser);

//create account owner user
router.post("/create", createAccountOwnerUser);

export default router;
