import express from "express";
import {
  getSmsRequests,
  getSmsRequest,
  sendSmsRequest,
  updateSmsRequest,
  deleteSmsRequest,
} from "../controllers/SmsRequestsController.js";

const router = express.Router();

//get all
router.get("/", getSmsRequests);

//get one
router.get("/:id", getSmsRequest);

//send sms
router.post("/send", sendSmsRequest);

//update
router.put("/update/:id", updateSmsRequest);

//delete

router.delete("/delete/:id", deleteSmsRequest);

export default router;
