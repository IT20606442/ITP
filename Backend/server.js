const express = require("express");
//const mongoose = require("mongoose");
//const cors = require("cors");
const dotenv = require("dotenv");
const notes = require("./data/notes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const transportRoutes = require("./routes/transportRoutes");
const petProfileRoutes = require("./routes/petProfileRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const articleRoutes = require("./routes/articleRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running..");
});

// app.get("/api/notes", (req, res) => {
//  res.json(notes);
// });

// app.get("/api/notes/:id", (req, res) => {
//  const note = notes.find((n) => n._id === req.params.id);
//  res.send(note);
//});

app.use(express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/pet", petProfileRoutes);
app.use("/api/prescription", prescriptionRoutes);
app.use("/api/article", articleRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8070;

app.listen(
  8070,
  console.log("Server is up and running on port number:" + PORT)
);
