const express = require("express");
const router = express.Router();
const User = require("../Database/Modals/User");
const ConnectMongo = require("../Database/conn");
const authenticateToken = require("../Helper/authenticateToken ");


router.get("/", authenticateToken, async (req, res) => {
    const { userId } = req.query;
    console.log("userId", userId);
    try {
      // Find posts by userId
      const UserData = await User.find();
  console.log("UserData", UserData);
      if (UserData) {
        res.status(200).json({ data: UserData });
      } else {
        res
          .status(201)
          .json({ error: "No UserData found for the user", data: [] });
      }
    } catch (error) {
      console.log(error, "error");
      res.status(500).json({ error: "Error retrieving UserData", data: [] });
    }
  }); 

module.exports = router;