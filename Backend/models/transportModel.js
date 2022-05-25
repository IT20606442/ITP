const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transportSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Appoinmentid: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Comments: {
    type: String,
    required: true,
  },
});
const transport = mongoose.model("Transport", transportSchema);
module.exports = transport;
//rftgygtg
