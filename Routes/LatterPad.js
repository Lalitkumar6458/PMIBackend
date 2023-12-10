const express = require("express");
const router = express.Router();
const LatterPad = require("../Database/Modals/LatterPad");
const authenticateToken = require("../Helper/authenticateToken ");


router.post("/", authenticateToken, async (req, res) => {
  console.log(req.body, "req.body");
  try {
    const newUser = new LatterPad(req.body);
    await newUser.save();
    console.log(newUser, "newUser");
    res.status(200).json({
      message: "latterpad registered successfully",
      data: { ...newUser },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
    const { userId } = req.query;
      try {
      // Find posts by userId
      const LstterPadData = await LatterPad.find({ userId });
  
      if (LstterPadData.length > 0) {
        res.status(200).json({ data: LstterPadData });
      } else {
        res
          .status(201)
          .json({ error: "No ClientData found for the user", data: [] });
      }
    } catch (error) {
      console.log(error, "error");
      res.status(500).json({ error: "Error retrieving ClientData", data: [] });
    }
  });
  router.put("/", authenticateToken, async (req, res) => {
    const { id,text1,text2,text3,agencyName,officeNo,mobileNo,email,heading,address,description,logo,formatId} = req.body;
  console.log(id,'id')
    try {
      // Find the user document based on the unique identifier (e.g., user ID)
      let latterpadData = await LatterPad.findById(id);
      console.log(latterpadData,'latterpadData')
      const updateData=req.body

      if (!latterpadData) {
        return res.status(404).json({ error: "client not found" });
      }
  
    latterpadData.text1=text1
    latterpadData.text2=text2
    latterpadData.text3=text3
    latterpadData.agencyName=agencyName
    latterpadData.officeNo=officeNo
    latterpadData.mobileNo=mobileNo
    latterpadData.email=email
    latterpadData.heading=heading
    latterpadData.address=address
    latterpadData.description=description
    latterpadData.logo=logo
    latterpadData.formatId=formatId
      // Save the updated user document
      await latterpadData.save();
      res.status(200).json({ message: "client updated successfully" });
    } catch (error) {
        console.log("error",error)
      res.status(500).json({ error: "Error updating user" });
    }
  });

module.exports = router;