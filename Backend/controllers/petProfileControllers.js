const asyncHandler = require("express-async-handler");
const PetProfile = require("../models/petProfileModel");
const { upload } = require("../middlewares/uploadMiddleware");

const fetchAllPetProfiles = asyncHandler(async (req, res) => {
  try {
    const fetchAllPetProfiles = await PetProfile.find();
    if (
      fetchAllPetProfiles !== null &&
      Object.keys(fetchAllPetProfiles).length > 0
    ) {
      res.status(200).json(fetchAllPetProfiles);
    } else {
      res.status(404).json({ message: `No Pet Profile Data Found` });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

const fetchPetProfileById = asyncHandler(async (req, res) => {
  try {
    const petProfile = await PetProfile.findById(req.params.id);
    if (petProfile !== null && Object.keys(petProfile).length > 0) {
      res.status(200).json(petProfile);
    } else {
      res.status(404).json({ message: "Pet Profile Not Found" });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

const createPetProfile = (req, res) => {
  try {
    upload(req, res, (err) => {
      PetProfile.findOne({
        ID: req.body.ID,
      })
        .then((petProfile) => {
          if (petProfile) {
            res
              .status(409)
              .json({ message: "Pet Already Exists with the Same Name" });
          } else {
            PetProfile.create({
              Pet_Name: req.body.Pet_Name,
              Mnumber: Number(req.body.Mnumber),
              Hnumber: Number(req.body.Hnumber),
              ID: req.body.owner + req.body.Pet_Name + req.body.PetAge,
              Breed: req.body.Breed,
              PetAge: req.body.PetAge,
              petProfileImage: req.file.filename,
              owner: req.body.owner,
            })
              .then(() =>
                res.status(200).json({
                  message: "The New Pet Profile Created Successfully!",
                })
              )
              .catch((err) =>
                res.status(400).json({ message: `Error: ${err}` })
              );
          }
        })
        .catch((err) => res.status(400).json({ message: `Error: ${err}` }));
    });
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
};

const updatePetProfile = (req, res) => {
  try {
    upload(req, res, (err) => {
      PetProfile.findById(req.params.id)
        .then((petProfile) => {
          if (petProfile) {
            petProfile.Pet_Name = req.body.Pet_Name || petProfile.Pet_Name;
            petProfile.Mnumber = Number(req.body.Mnumber) || petProfile.Mnumber;
            petProfile.Hnumber = Number(req.body.Hnumber) || petProfile.Hnumber;
            petProfile.Breed = req.body.Breed || petProfile.Breed;
            petProfile.PetAge = req.body.PetAge || petProfile.PetAge;
            petProfile.petProfileImage =
              req?.file?.filename || petProfile.petProfileImage;

            petProfile
              .save()
              .then(() =>
                res
                  .status(200)
                  .json({ message: "The Pet Profile is Updated Successfully" })
              )
              .catch((err) =>
                res.status(400).json({ message: `Error: ${err}` })
              );
          } else {
            res.status(404).json({ message: "Pet Profile Not Found" });
          }
        })
        .catch((err) => res.status(400).json({ message: `Error: ${err}` }));
    });
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
};

const deletePetProfile = asyncHandler(async (req, res) => {
  try {
    const petProfile = await PetProfile.findByIdAndDelete(req.params.id);

    if (petProfile !== null && Object.keys(petProfile).length > 0) {
      res.status(200).json({ message: "The Pet Profile is DELETED!" });
    } else {
      res.status(404).json({ message: "Pet Profile Not Found" });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

module.exports = {
  fetchAllPetProfiles,
  fetchPetProfileById,
  createPetProfile,
  updatePetProfile,
  deletePetProfile,
};
