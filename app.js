require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require("./Routes/users");
const LoginRoutes = require("./Routes/login");
const ChemicalRoutes=require("./Routes/Chemical")
const ClientRoutes = require("./Routes/Client");
const GoogleLoginRoutes = require("./Routes/GoogleLogin");




const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/login", LoginRoutes);
app.use("/googlelogin", GoogleLoginRoutes);
app.use("/chemical", ChemicalRoutes);
app.use("/client", ClientRoutes);




app.listen(PORT, () => {
  // ConnectMongo();
  console.log(`Server is running on port ${PORT}`);
});