const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petProfileSchema = new Schema({
  Pet_Name: { type: String, required: true },
  Mnumber: { type: Number, required: true },
  Hnumber: { type: Number, required: true },
  ID: { type: String, required: true, unique: true },
  Breed: { type: String, required: true },
  PetAge: { type: String, required: true },
  petProfileImage: { type: String, required: true },
  owner: { type: String, required: true },
});

const PetProfile = mongoose.model("PetProfile", petProfileSchema);

module.exports = PetProfile;
