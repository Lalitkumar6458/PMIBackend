const express = require("express");
const router = express.Router();
const Report = require("../Database/Modals/Report");
const authenticateToken = require("../Helper/authenticateToken ");
const Chemical = require("../Database/Modals/Chemical");
const Client = require("../Database/Modals/Client");

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
router.get("/", authenticateToken, async (req, res) => {
  const { userId } = req.query;
  console.log("userId", userId);
  try {
    // Find posts by userId
        const ClientLen = await Client.find({ userId });
        const Chemicallen = await Chemical.find({ userId });
    const ClientData = await Report.find({ userId }).sort({ _id: -1 });

    if (ClientData) {
      res.status(200).json({
        data: ClientData,
        dashbordData: {
          ClientLen: ClientLen.length,
          ChemicalLen: Chemicallen.length,
          ReportLen: ClientData.length,
        },
      });
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
  const {
    id,
    InstrumentId,
    ModalNo,
    agencyName,
    blukItemType,
    chemical,
    clientId,
    clientName,
    date,
    grade,
    location,
    lotNo,
    pmiReportNo,
    poDate,
    poNo,
    reportaddedData,
    vendor,
  } = req.body;

  try {
    // Find the user document based on the unique identifier (e.g., user ID)
    const clientlData = await Report.findById(id);
    if (!clientlData) {
      return res.status(404).json({ error: "client not found" });
    }
    // Update the user document with the new data
    clientlData.InstrumentId = InstrumentId;
    clientlData.ModalNo = ModalNo;
    clientlData.agencyName = agencyName;
    clientlData.blukItemType = blukItemType;
    clientlData.chemical = chemical;
    clientlData.clientId = clientId;
    clientlData.clientName = clientName;
    clientlData.date = date;
    clientlData.grade = grade;
    clientlData.location = location;
    clientlData.lotNo = lotNo;
    clientlData.poDate = poDate;
    clientlData.pmiReportNo = pmiReportNo;
    clientlData.poNo = poNo;
    clientlData.reportaddedData = reportaddedData;
    clientlData.vendor = vendor;

    // Save the updated user document
    await clientlData.save();
    res
      .status(200)
      .json({ message: "Report updated successfully", data: clientlData });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error updating user" });
  }
});
router.delete("/", async (req, res) => {
  console.log(req.body, "req.body");
  try {
    const { id, userId } = req.body;

    // Find the group by its ID
    const client = await Report.findById(id);
    console.log("client", client);
    // Check if the group exists
    if (!client) {
      return res.status(404).json({ error: "Report not found" });
    }
    await client.deleteOne();

    return res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
