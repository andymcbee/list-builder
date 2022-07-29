import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import smsRequestRoute from "./routes/smsRequestRoutes.js";
import usersRoute from "./routes/userRoutes.js";
import messagesRoute from "./routes/messageRoutes.js";

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
dotenv.config();
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/sms-requests", smsRequestRoute);
app.use("/api/users", usersRoute);
app.use("/api/messages", messagesRoute);

//serve frontend
if (process.env.NODE_ENV === "production") {
  //specifcy the build directory
  app.use(express.static(path.join("server/", "../client/build")));
  //specify route
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve("server/", "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Set to production."));
}

app.listen(port, () => console.log(`Server started on port ${port}`));
