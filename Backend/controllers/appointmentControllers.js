const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");

const fetchAllAppointments = asyncHandler(async (req, res) => {
  try {
    const fetchAllAppointment = await Appointment.find();
    if (
      fetchAllAppointment !== null &&
      Object.keys(fetchAllAppointment).length > 0
    ) {
      res.status(200).json(fetchAllAppointment);
    } else {
      res.status(404).json(`No Appointments Data Found`);
    }
  } catch (err) {
    res.status(417).json(`Error: ${err}`);
  }
});

const fetchAppointmentById = asyncHandler(async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment !== null && Object.keys(appointment).length > 0) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json(`Appointment Not Found`);
    }
  } catch (err) {
    res.status(417).json(`Error: ${err}`);
  }
});
const createAppointment = asyncHandler(async (req, res) => {
  try {
    const newAppointment = await Appointment.create({
      date: req.body.date,
      name: req.body.name,
      age: req.body.age,
      tpNo: req.body.tpNo,
      email: req.body.email,
      reason: req.body.reason,
    })
      .then(() => {
        if (newAppointment !== null && Object.keys(newAppointment).length > 0) {
          res
            .status(200)
            .json({ message: "The New Appointment Created Successfully!" });
        } else {
          res.status(400).json({
            message: `Error: An Error Occurred, Please Try Again Later`,
          });
        }
      })
      .catch((err) => res.status(400).json({ message: `Error: ${err}` }));
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

const updateAppointment = asyncHandler(async (req, res) => {
  try {
    let appointmentId = req.body.ID;
    const { date } = req.body;
    const { name } = req.body;
    const { age } = req.body;
    const { tpNo } = req.body;
    const { email } = req.body;
    const { reason } = req.body;

    const Update = {
      date,
      name,
      age,
      tpNo,
      email,
      reason,
    };

    const updateAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      Update
    )
      .then(() => {
        if (
          updateAppointment !== null &&
          Object.keys(updateAppointment).length > 0
        ) {
          res.status(200).json({ message: "Appointment updated" });
        } else {
          res.status(400).json({
            message: `Error: An Error Occurred, Please Try Again Later`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: `Error: ${err}`,
        });
      });
  } catch (err) {
    res.status(417).json(`Error: ${err}`);
  }
});

const deleteAppointment = asyncHandler(async (req, res) => {
  try {
    var appointmentId = req.params.id;
    await Appointment.findByIdAndRemove(appointmentId)
      .exec()
      .then(() => {
        res.status(200).json({ message: "Appointment deleted" });
      })
      .catch((err) => {
        res.status(400).json({
          message: `Error: ${err}`,
        });
      });
  } catch (err) {
    res.status(417).json(`Error: ${err}`);
  }
});

module.exports = {
  fetchAllAppointments,
  fetchAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
