const express = require("express");
const router = express.Router();
const authenticateToken = require("../Helper/authenticateToken ");
const Chemical = require("../Database/Modals/Chemical");

router.get("/", authenticateToken, async (req, res) => {
  const { userId, grade } = req.query;
  console.log("userId", userId);
  try {
    // Find posts by userId
    const ChemicalData = await Chemical.find({ userId, grade });

    console.log(ChemicalData, "ChemicalData");

    if (ChemicalData) {

      res.status(200).json({ data: ChemicalData });
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

module.exports = router;
