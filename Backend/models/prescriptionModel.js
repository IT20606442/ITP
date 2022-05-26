const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  medicationId: { type: String },
  medicationQuantity: { type: Number },
  other: { type: String },
  description: { type: String, required: true },
  nextMeetup: { type: Date },
  petProfile: { type: String, required: true },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
