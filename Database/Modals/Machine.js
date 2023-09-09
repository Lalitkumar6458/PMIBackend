const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    modalNo: { type: String, required: true },
    instrumentId: { type: String, required: true },
  },
  { timestamps: true }
);

const Machine =
  mongoose.models.Machine || mongoose.model("Machine", MachineSchema);

module.exports = Machine;
