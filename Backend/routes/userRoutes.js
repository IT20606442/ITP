const express = require("express");
const {
  fetchAllUsers,
  registerUser,
  authUser,
  updateUserProfile,
  DeleteProfile,
} = require("../controllers/userControllers");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/view").get(protect, fetchAllUsers);
router.route("/add").post(registerUser);
router.route("/login").post(authUser);
router.route("/update/:id").put(protect, updateUserProfile);

router.route("/delete/:id").delete(protect, DeleteProfile);

module.exports = router;
