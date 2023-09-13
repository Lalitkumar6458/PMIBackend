const mongoose = require("mongoose");

const LatterSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    formatId:{ type: String, required: true },
    text1:{ type: String, required: false },
    text2:{ type: String, required: false },
    text3:{ type: String, required: false },
    agencyName:{ type: String, required: true },
    officeNo:{ type: String, required: false },
    mobileNo:{ type: String, required: true },
    email:{ type: String, required: true },
    heading:{ type: String, required: true },
    address:{ type: String, required: true },
    description:{ type: String, required: true },
    logo:{ type: String, required: false },  
  },
  { timestamps: true }
);

const LatterPad = mongoose.models.LatterPad || mongoose.model("LatterPad", LatterSchema);

module.exports = LatterPad;