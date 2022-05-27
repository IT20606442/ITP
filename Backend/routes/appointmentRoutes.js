const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  fetchAllAppointments,
  fetchAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentControllers");

router.route("/view").get(fetchAllAppointments);

router.route("/get/:id").get(fetchAppointmentById);

router.route("/add").post(createAppointment);

router.route("/update/:id").put(updateAppointment);

router.route("/delete/:id").delete(deleteAppointment);

module.exports = router;
