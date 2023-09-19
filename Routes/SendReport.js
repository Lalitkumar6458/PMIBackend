const express = require("express");
const router = express.Router();
const Report = require("../Database/Modals/Report");
const authenticateToken = require("../Helper/authenticateToken ");
const nodemailer = require("nodemailer");
const axios = require("axios");
const apiKey = "4E31F9559C29E93B637CF4FED871062091F5A64F715EC3AA9DD53E534DB0EC7300F59C8E65EC8B4A0D55AC36B2B551E2";
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

//  const apppass = "nsaqtlxtwmzzpbep";
//  const email = "lalitkumar6458@gmail.com";
  try {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.elasticemail.com",
//     port: 2525,
//     auth: {
//       user: "pmireportsystem@gmail.com",
//       pass: "765A35463808C6699FF940D88698EF14066E",
//     },
//   });
// const pdfBase64 = "your-base64-pdf-data"; // Replace with your actual base64 PDF data
// const pdfBuffer = Buffer.from(pdfurl, "base64");

// const mailOptions = {
// from: '"Pmi Report System" <pmireportsystem@gmail.com>',
//   to: "lalitkumarabc60@gmail.com",
//   subject: "PDF Attachment new pdf",
//   text: "Here is the PDF attachment.new report ugjf",
//   attachments: [
//     {
//       filename: "newDocument 23.pdf", // Name of the attached PDF file
//       content: pdfBuffer,
//     },
//   ],
// };
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error("Error sending email:", error);
//   } else {
//     console.log("Email sent:", info.response);
//   }
// });

axios
  .post("https://api.elasticemail.com/v2/email/send", {
    apikey: apiKey,
    from: email.from,
    to: email.to,
    subject: email.subject,
    body: email.body,
    attachments: [
      {
        content: pdfBuffer,
        filename: "document.pdf",
      },
    ],
  })
  .then((response) => {
    console.log("Email sent successfully:", response.data);
  })
  .catch((error) => {
    console.error("Error sending email:", error);
  });
    res.status(200).json({
      message: "Report registered successfully",
      data: {  },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
});
module.exports = router;
