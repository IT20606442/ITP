const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  fetchAllPetProfiles,
  fetchPetProfileById,
  createPetProfile,
  updatePetProfile,
  deletePetProfile,
} = require("../controllers/petProfileControllers");

//Request get all pet profiles
router.route("/").get(fetchAllPetProfiles);

//Request find pet profile by Id
router.route("/:id").get(fetchPetProfileById);

//Request add new pet profile
router.route("/add").post(createPetProfile);

//Request find pet profile by Id and update
router.route("/update/:id").put(updatePetProfile);

//Request find pet profile by Id and delete
router.route("/:id").delete(deletePetProfile);

module.exports = router;
