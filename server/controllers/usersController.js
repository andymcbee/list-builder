import dotenv from "dotenv";
import User from "../models/user.js";
import mongoose from "mongoose";
import { uid } from "uid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import nodemailer from "nodemailer";

dotenv.config();

//-----Get single user with a valid JWT-----

export const getUserByJwt = async (req, res) => {
  try {
    console.log("API CALL HIT");

    const token = req.headers.authorization.split(" ")[1];

    // console.log(req.headers.authorization);

    let decodedData = jwt.verify(token, process.env.JWTSECRET);

    //console.log(decodedData);

    const existingUser = await User.findOne({ _id: decodedData.id });
    console.log("EXISTING USER::::::::");
    console.log(existingUser);

    if (!existingUser) {
      return res
        .status(409)
        .json({ message: "User does not exist", error: true });
    }

    res.status(200).json({ result: existingUser });
  } catch (error) {
    //this should return error to client
    return res.status(401).json({
      message: "Error",
      error: true,
    });
  }
};

//-----Create user-----
export const createUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  //Same as account user - except do not generate a account Id. Instead, use the param account Id provided.
  //do a lookup for that account in the event a non existing id is passed back somehow.
  res.status(200).json({ message: "Create a user" });
};

//-----Create Account Owner and Provision New Account-----
export const createAccountOwnerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

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

  //create a default Message for the account

  const createNewMessage = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = {
      headline: "Enter your phone number for a chance to win a $100 gift card!",
      message:
        "Hi, thank you for visiting us. How was your experience? We'd love to hear from you!",
    };

    try {
      const { data } = await axios.post(
        `/api/messages/create/${newUser.accountId}`,
        bodyParameters,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  createNewMessage();

  //respond to client

  res.status(200).json({ result: newUser, token });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  console.log("WORKED");

  try {
    //attempt to find a user in the DB that matches the req.body.email
    const existingUser = await User.findOne({ email });

    //If user not found, return an error message
    if (!existingUser)
      return res
        .status(404)
        .json({ message: "User does not exist", error: true });

    //check to see if password provided matches hashed password in DB

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    //logic if password is not correct

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Invalid credentials.", error: true });

    //If user exists, and password is correct, get a JWT to send to front end

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

//reset password

export const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  async function main(userId, token) {
    const link = `http://localhost:3000/set-password/${userId}/${token}`;
    console.log(link);

    const html = `<html><body>Hey, here's that link I weas talking about: <a href="${link}">here</a></body></html>`;

    console.log("userId::::");
    console.log(userId);
    console.log("token:::::");
    console.log(token);

    const user = process.env.OUTLOOKUSER;
    const pass = process.env.OUTLOOKPASS;
    console.log("user:::::");
    console.log(user);
    console.log("pass:::::");

    console.log(pass);

    const subject = "Password Reset";

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user,
        pass,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `Andrew McBurney" <${user}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Hello world?", // plain text body
      html, // html body
    });
  }

  try {
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      const userId = existingUser._id.toString();
      const userSecret = process.env.JWTSECRETPASSRESET + userId;

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser.password },
        userSecret,
        { expiresIn: "15m" }
      );
      main(userId, token).catch(console.error);
    }
  } catch (error) {
    console.log(error);
  }


};
