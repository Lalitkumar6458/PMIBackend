const express = require("express");
const router = express.Router();
const Chemical = require("../Database/Modals/Chemical");
const authenticateToken =require("../Helper/authenticateToken ")
const ConnectMongo = require("../Database/conn");
const DeleteFun=require("../Helper/CommanFun")

router.post("/",authenticateToken, async (req, res) => {

  console.log(req.body, "req.body");
  try {
    const newUser = new Chemical(req.body);

    await newUser.save();
    console.log(newUser, "newUser");

    res
      .status(200)
      .json({
        message: "Chemical registered successfully",
        data: { status: 200 },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
});
router.get("/",authenticateToken, async (req, res) => {
  const { userId} = req.query;
  console.log("userId", userId);
  try {
    // Find posts by userId
    const gradeData = await Chemical.find({ userId });

    if (gradeData.length > 0) {
      res.status(200).json({ data: gradeData });
    } else {
      res.status(404).json({ error: "No gradeData found for the user", data: [] });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ error: "Error retrieving gradeData", data: [] });
  }
});
router.put("/",authenticateToken, async (req, res) => {
  const { id, grade,chemical } = req.body;

  try {
    // Find the user document based on the unique identifier (e.g., user ID)
    const chemicalData = await Chemical.findById(id);
    if (!chemicalData) {
      return res.status(404).json({ error: "chemical not found" });
    }
    // Update the user document with the new data
    chemicalData.grade = grade;
    chemicalData.chemical = chemical;
    
    // Save the updated user document
    await chemicalData.save();
    res.status(200).json({ message: "Chemical updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});
router.delete("/", async (req, res) => {
    console.log(req.body, "req.body");
 try {
   const { id, userId } = req.body;

   // Find the group by its ID
   const group = await Chemical.findById(id);

   // Check if the group exists
   if (!group) {
     return res.status(404).json({ error: "Chemical not found" });
   }
   await group.deleteOne();

   return res.status(200).json({ message: "Chemical deleted successfully" });
 } catch (error) {
   console.error("Error deleting Chemical:", error);
   return res.status(500).json({ error: "Internal server error" });
 }
})


module.exports = router;

