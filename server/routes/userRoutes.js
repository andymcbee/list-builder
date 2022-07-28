import express from "express";
import {
  getUserByJwt,
  createUser,
  createAccountOwnerUser,
  signin,
} from "../controllers/usersController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//get one
router.post("/", auth, getUserByJwt);

//create user
router.post("/create/:teamId", createUser);

//create account owner user
router.post("/create", createAccountOwnerUser);

//sign user in
router.post("/signin", signin);

export default router;
