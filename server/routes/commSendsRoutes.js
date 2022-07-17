const express = require("express");
const router = express.Router();
const {
  getCommSends,
  getCommSend,
  createCommSend,
  updateCommSend,
  deleteCommSend,
} = require("../controllers/commSendsController");

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

module.exports = router;
