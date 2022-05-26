const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  fetchAllProfiles,
  fetchProfileById,
  profileLogin,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profilesControllers");

//Request get all profiles
router.route("/").get(fetchAllProfiles);

//Request get all profiles
router.route("/view").get(fetchAllProfiles);

//Request get all profiles
router.route("/login").post(profileLogin);

//Request find profile by Id
router.route("/get/:id").get(fetchProfileById);

//Request add new profile
router.route("/add").post(createProfile);

//Request find profile by Id and update
router.route("/update/:id").put(updateProfile);

//Request find profile by Id and delete
router.route("/delete/:id").delete(deleteProfile);

module.exports = router;
