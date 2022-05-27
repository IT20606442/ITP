const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  iteamId: {
    type: String,
    required: true,
    unique: true,
  },
  iteamName: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  issuedQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  brandName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
