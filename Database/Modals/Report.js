const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    grade: { type: String, required: true },
    chemical: { type: Array, required: true },
    clientId: { type: String, required: true },
    clientName:{type: String, required: true},
    agencyName: { type: String, required: true },
    location: { type: String, required: true },
    date:{ type: Date, required: true },
    pmiReportNo: { type: String, required: false },
    poNo: { type: String, required: false },
    InstrumentId: { type: String, required: false },
    ModalNo: { type: String, required: false },
    poDate: { type: Date, required: false },
    lotNo: { type: String, required: false },
    vendor: { type: String, required: false },
    blukItemType: { type: String, required: false },
    reportaddedData: { type: Array, required: true },
  },
  { timestamps: true }
);

const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);

module.exports = Report;
