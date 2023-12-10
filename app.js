require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require("./Routes/users");
const LoginRoutes = require("./Routes/login");
const ChemicalRoutes=require("./Routes/Chemical")
const ReportRoutes = require("./Routes/Report");

const ClientRoutes = require("./Routes/Client");
const machineRoutes = require("./Routes/Machine");
const SendAllDataRoutes = require("./Routes/SendReportData");
const SendGradeDataRoutes=require("./Routes/SendGradeData")
const LatterPad=require("./Routes/LatterPad")
const SendReport = require("./Routes/SendReport");

const Admin=require("./Routes/Admin")

const GoogleLoginRoutes = require("./Routes/GoogleLogin");




const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/login", LoginRoutes);
app.use("/googlelogin", GoogleLoginRoutes);
app.use("/chemical", ChemicalRoutes);
app.use("/report", ReportRoutes);
app.use("/client", ClientRoutes);
app.use("/machine", machineRoutes);
app.use("/getalldata", SendAllDataRoutes);
app.use("/getgradedata", SendGradeDataRoutes);
app.use("/latterpad",LatterPad)
app.use("/sendreport", SendReport);
app.use("/Admin", Admin);



app.listen(PORT, () => {
  // ConnectMongo();
  console.log(`Server is running on port ${PORT}`);
});