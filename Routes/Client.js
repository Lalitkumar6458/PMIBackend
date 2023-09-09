const express = require("express");
const router = express.Router();
const Client = require("../Database/Modals/Client");
const authenticateToken = require("../Helper/authenticateToken ");


router.post("/", authenticateToken, async (req, res) => {
  console.log(req.body, "req.body");
  try {
    const newUser = new Client(req.body);

    await newUser.save();
    console.log(newUser, "newUser");

    res.status(200).json({
      message: "Chemical registered successfully",
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
    const ClientData = await Client.find({ userId });

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
  const { id, name,email,phoneNo,address } = req.body;

  try {
    // Find the user document based on the unique identifier (e.g., user ID)
    const clientlData = await Client.findById(id);
    if (!clientlData) {
      return res.status(404).json({ error: "client not found" });
    }
    // Update the user document with the new data
    clientlData.name = name;
    clientlData.email = email;
    clientlData.phoneNo = phoneNo;
    clientlData.address = address;



    // Save the updated user document
    await clientlData.save();
    res.status(200).json({ message: "client updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

router.delete("/", async (req, res) => {
  console.log(req.body, "req.body");
  try {
    const { id, userId } = req.body;

    // Find the group by its ID
    const client = await Client.findById(id);
console.log("client", client);
    // Check if the group exists
    if (!client) {
      return res.status(404).json({ error: "client not found" });
    }
    await client.deleteOne();

    return res.status(200).json({ message: "client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
