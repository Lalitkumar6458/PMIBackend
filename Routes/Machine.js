const express = require("express");
const router = express.Router();
const Machine = require("../Database/Modals/Machine");
const authenticateToken = require("../Helper/authenticateToken ");

router.post("/", authenticateToken, async (req, res) => {
  console.log(req.body, "req.body");
  try {
    const newUser = new Machine(req.body);

    await newUser.save();
    console.log(newUser, "newUser");

    res.status(200).json({
      message: "Machine registered successfully",
      data: { status: 200 },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  const { userId } = req.query;
  console.log("userId", userId);
  try {
    // Find posts by userId
    const ClientData = await Machine.find({ userId }).sort({ _id: -1 });

    if (ClientData.length > 0) {
      res.status(200).json({ data: ClientData });
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
  const { id, name, modalNo, instrumentId } = req.body;

  try {
    // Find the user document based on the unique identifier (e.g., user ID)
    const clientlData = await Machine.findById(id);
    if (!clientlData) {
      return res.status(404).json({ error: "client not found" });
    }
    // Update the user document with the new data
    clientlData.name = name;
    clientlData.modalNo = modalNo;
    clientlData.instrumentId = instrumentId;

    // Save the updated user document
    await clientlData.save();
    res.status(200).json({ message: "Machine updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

router.delete("/", async (req, res) => {
  console.log(req.body, "req.body");
  try {
    const { id, userId } = req.body;

    // Find the group by its ID
    const machine = await Machine.findById(id);
    console.log("machine", machine);
    // Check if the group exists
    if (!machine) {
      return res.status(404).json({ error: "machine not found" });
    }
    await machine.deleteOne();

    return res.status(200).json({ message: "machine deleted successfully" });
  } catch (error) {
    console.error("Error deleting machine:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
