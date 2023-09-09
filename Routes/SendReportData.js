const express = require("express");
const router = express.Router();
const Machine = require("../Database/Modals/Machine");
const authenticateToken = require("../Helper/authenticateToken ");
const User=require("../Database/Modals/User")
const Client =require("../Database/Modals/Client")
const Chemical=require("../Database/Modals/Chemical")

router.get("/", authenticateToken, async (req, res) => {
  const { userId } = req.query;
  console.log("userId", userId);
  console.log("all data get")
  try {
    // Find posts by userId
    const ClientData = await Client.find({ userId });
    const MachineData = await Machine.find({ userId });
    const ChemicalData = await Chemical.find({ userId });
 const UserData = await User.findById(userId);
    console.log(MachineData, "MachineData");
    console.log(UserData, "UserData");
console.log(ClientData, "ClientData");
console.log(ChemicalData, "ChemicalData");

    if (
      UserData
    ) {
      const data = {
        ClientData,
        MachineData,
        ChemicalData,
        UserData,
      };
      res.status(200).json({ data: data });
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
