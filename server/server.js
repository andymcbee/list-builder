import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import smsRequestRoute from "./routes/smsRequestRoutes.js";
import usersRoute from "./routes/userRoutes.js";
import messagesRoute from "./routes/messageRoutes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const port = process.env.PORT || 5000;

app.use("/api/sms-requests", smsRequestRoute);
app.use("/api/users", usersRoute);
app.use("/api/messages", messagesRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log(`Server running on ${port}.`);
    })
  )
  .catch((err) => console.log(err));
