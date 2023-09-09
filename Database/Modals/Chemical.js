const mongoose = require("mongoose");

const ChemicalSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    grade: { type: String, required: true },
    chemical: { type: Array, required: true },
    category: { type: String, required: false },
  },
  { timestamps: true }
);

const Chemical = mongoose.models.Chemical || mongoose.model("Chemical", ChemicalSchema);

module.exports = Chemical;
