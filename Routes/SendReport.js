const express = require("express");
const router = express.Router();
const Report = require("../Database/Modals/Report");
const authenticateToken = require("../Helper/authenticateToken ");
const nodemailer = require("nodemailer");
const axios = require("axios");
router.post("/", authenticateToken, async (req, res) => {
//   console.log(req.body, "req.body");
const { pdfurl, userId } = req.body;
const email = {
  from: "lalitkumar6458@gmail.con",
  to: "kumar932687@gmail.com",
  subject: "Subject of the Email",
  body: "This is the email body.",
};
const pdfBuffer = Buffer.from(pdfurl, "base64");

  try {

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
});
module.exports = router;
