const express = require("express");
const router = express.Router();
const Report = require("../Database/Modals/Report");
const authenticateToken = require("../Helper/authenticateToken ");


router.post("/", authenticateToken, async (req, res) => {
  console.log(req.body, "req.body");
  try {
    const newUser = new Report(req.body);

    await newUser.save();
    console.log(newUser, "newUser");

    res.status(200).json({
      message: "Report registered successfully",
      data: { ...newUser },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
});



module.exports = router;
