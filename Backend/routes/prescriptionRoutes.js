const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  fetchAllPrescriptions,
  fetchPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
} = require("../controllers/prescriptionControllers");

router.route("/view").get(fetchAllPrescriptions);

router.route("/get/:id").get(fetchPrescriptionById);

router.route("/add").post(createPrescription);

router.route("/update/:id").put(updatePrescription);

router.route("/delete/:id").delete(deletePrescription);

module.exports = router;
