const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Client = mongoose.models.Client || mongoose.model("Client", ClientSchema);

module.exports = Client;
