const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const profileSchema = new Schema({
  First_Name: { type: String, requied: true },
  Last_Name: { type: String, required: true },
  Birthday: { type: Date, required: true },
  Gender: { type: String, required: true },
  City: { type: String, required: true },
  Country: { type: String, required: true },
  Contact_No: { type: Number, required: [true, "User phone number required"] },
  profileImage: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Available_Day: { type: String, required: true },
  Available_Date: { type: Date, required: true },
  Available_STime: { type: Date, required: true },
  Available_ETime: { type: Date, required: true },
  UserType: {
    type: String,
    required: true,
    enum: ["ADMIN", "VET"],
    default: "VET",
  },
});

profileSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10); //more higher value more secure the password
  this.password = await bcrypt.hash(this.password, salt); //encrypting password
});

profileSchema.methods.matchPassword = async function (enteredPassword) {
  //checking the passwords are matching
  return await bcrypt.compare(enteredPassword, this.password);
};

const Profiles = mongoose.model("Profile", profileSchema);

module.exports = Profiles;
