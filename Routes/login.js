const express = require("express");
const router = express.Router();
const User = require("../Database/Modals/User");
const ConnectMongo = require("../Database/conn");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

ConnectMongo();
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(201).json({ message: "Incorrect password" });
    }
    
const resData={
    username:user.name,
    email:user.email,
    id:user._id
}
    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Login successful", token, data: resData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
