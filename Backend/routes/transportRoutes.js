const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  fetchAllTransports,
  fetchTransportById,
  createTransport,
  updateTransport,
  deleteTransport,
} = require("../controllers/transportControllers");

//Request get all transport records
router.route("/").get(fetchAllTransports);

//Request find transport record by Id
router.route("/:id").get(fetchTransportById);

//Request add new transport record
router.route("/add").post(createTransport);

//Request find transport record by Id and update
router.route("/update/:id").put(updateTransport);

//Request find transport record by Id and delete
router.route("/:id").delete(deleteTransport);

module.exports = router;
