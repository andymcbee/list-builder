import dotenv from "dotenv";
import User from "../models/user.js";
import mongoose from "mongoose";
import { uid } from "uid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

//-----Get single user-----
export const getUser = (req, res) => {
  res.status(200).json({ message: `Get single user id: ${req.params.id}` });
};

//-----Create user-----
export const createUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  console.log(req.params.accountId);
  //Same as account user - except do not generate a account Id. Instead, use the param account Id provided.
  //do a lookup for that account in the event a non existing id is passed back somehow.
  res.status(200).json({ message: "Create a user" });
};

//-----Create user-----
export const createAccountOwnerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  console.log(req.body);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "A user exists with that email already!", error: true });
  }

  //If passwords don't match, return an error
  if (password !== confirmPassword) {
    return res
      .status(409)
      .json({ message: "Passwords do not match", error: true });
  }

  //generate unique number until true unique is found (in users table)
  const generateUniqueAccountId = async () => {
    let randomNum = uid();

    const existingAccountId = await User.findOne({
      accountId: randomNum,
    });
    if (existingAccountId) {
      generateUniqueAccountId();
    } else {
      return randomNum;
    }
  };

  let accountUniqueId = await generateUniqueAccountId();

  //Hash password prior to storing
  const hashedPassword = await bcrypt.hash(password, 12);
  //Create a new user
  const newUser = await User.create({
    email,
    password: hashedPassword,
    accountId: accountUniqueId,
  });
  //Create JWToken for user so we can sign them in after sign up
  const token = jwt.sign(
    { email: newUser.email, id: newUser._id },
    process.env.JWTSECRET,
    { expiresIn: "1h" }
  );
  res.status(200).json({ result: newUser, token });
};

//create user logic
//account owner
//pass email, pw, confirm pw into backend
//check and see if user exists w/ email
//if so, return error. (Message + Error: true)
//check and see if passwords match
//If not, return error: (Message + error: true)
//encrypt the PW
//generate and random team ID + check to ensure it doesn't match one in MongoDB
//create a new user in MongoDB w/ email + encrypted password + team ID
//create JWT
//respond w/ user + token
