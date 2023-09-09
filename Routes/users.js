const express = require("express");
const router = express.Router();
const User = require("../Database/Modals/User");
const ConnectMongo = require("../Database/conn");
const authenticateToken = require("../Helper/authenticateToken ");

const bcrypt = require("bcrypt");

// Create a new user

ConnectMongo();
console.log("dld",process.env.JWT_SECRET)
router.post("/", async (req, res) => {
    console.log("req.body", req.body);
    try {
      const { signupMethod, username, email, password } = req.body;

      if (signupMethod === "google") {
//   const { email, username } = req.body;
  // Perform user registration logic here, e.g., store the user in a database
  // You can also generate a JWT token and send it back to the frontend for authentication
   const existingUser = await User.findOne({ email });

    if (!existingUser) {
      // If the user doesn't exist, create a new user record
      const newUser = new User({
        name: username,
        email,  
      });

      await newUser.save();
      console.log('New user registered:', newUser);
  res
    .status(200)
    .json({ message: "User registered successfully", data: newUser });

    }else{
        console.log("Registered allready", existingUser);
        let userData = {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        };
  res.status(200).json({ message: "Registered allready ", data: userData });

    }
        // return res.status(201).json({ message: 'Google signup successful' });
      } else if (signupMethod === "manual") {
        // Handle manual (username, password, and email) signup
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already registered");
          return res.status(201).json({ message: "Email already registered" });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record in your database
        const newUser = new User({
          name:username,
          email,
          password: hashedPassword,
        });

        await newUser.save();

        // Return a success message
        return res.status(201).json({ message: "Manual signup successful" });
      } else {
        return res.status(400).json({ message: "Invalid signup method" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/", authenticateToken, async (req, res) => {
  const { userId } = req.query;
  console.log("userId", userId);
  try {
    // Find posts by userId
    const UserData = await User.findById(userId);
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


router.put("/", authenticateToken, async (req, res) => {
  const { id, name, email, phoneNo, companyName } = req.body;

  try {
    // Find the user document based on the unique identifier (e.g., user ID)
    const clientlData = await User.findById(id);
    if (!clientlData) {
      return res.status(404).json({ error: "user not found" });
    }
    // Update the user document with the new data
    clientlData.name = name;
    clientlData.email = email;
    clientlData.phoneNo = phoneNo;
    clientlData.companyName = companyName;

    // Save the updated user document
    await clientlData.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

module.exports = router;
