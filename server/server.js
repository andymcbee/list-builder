import express from "express";
import dotenv from "dotenv";
import commSendsRoute from "./routes/commSendsRoutes.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.use("/api/comm-sends", commSendsRoute);

app.listen(port, () => console.log(`server started on ${port}`));
