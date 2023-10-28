const express = require("express");
const router = express.Router();
const Report = require("../Database/Modals/Report");
const authenticateToken = require("../Helper/authenticateToken ");
const Client = require("../Database/Modals/Client");
const Chemical = require("../Database/Modals/Chemical");
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
let pdfBuffer
  try {
    // Decode the Base64 PDF URL to a regular URL
    const pdfUrl = Buffer.from(pdfurl, 'base64').toString('utf-8');
    // console.log("pdfurl",pdfUrl)

    try {
      const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
      // Check response status and handle it accordingly
      if (response.status === 200) {
        // Successfully fetched the PDF content
         pdfBuffer = Buffer.from(response.data);
        // Continue with PDF processing
      } else {
        console.error(`Failed to fetch the PDF. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching the PDF:', error.message);
    }
console.log("pdfBuffer",pdfBuffer)
    // Convert the PDF buffer to an image
    const options = {
      outputFormat: 'jpeg',
      page: 1,
      width: 800,
      height: 600,
    };

    const images = await pdf2image.convertBuffer(pdfBuffer, options);

    // Encode the image as Base64
    const imageBase64 = base64Img.base64Sync(images[0].path);

    // Send the Base64-encoded image to the frontend
    res.json({ imageBase64 });

  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
});


router.get("/", authenticateToken, async (req, res) => {
  const { userId } = req.query;
  console.log("userId", userId);
  try {
    // Find posts by userId
    const ReportData = await Report.find({ userId });
    const ClientData=await Client.find({ userId });
    const ChemicalData=await Chemical.find({ userId });


    res.status(200).json({ Client:ClientData.length,Chemical:ChemicalData.length,ReportToday:ReportData.length,ReportMonth:ReportData.length });

   
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ error: "Error retrieving ClientData", data: [] });
  }
});
module.exports = router;
