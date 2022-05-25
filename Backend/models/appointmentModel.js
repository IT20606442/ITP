const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  ID: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  age: {
    type: String,
    required: true,
  },

  tpNo: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  reason: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
