const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const { upload } = require("../middlewares/uploadMiddleware");
const generateToken = require("../utils/generateToken");

const fetchAllProfiles = asyncHandler(async (req, res) => {
  try {
    const fetchAllProfiles = await Profile.find();
    if (fetchAllProfiles !== null && Object.keys(fetchAllProfiles).length > 0) {
      res.status(200).json(fetchAllProfiles);
    } else {
      res.status(404).json({ message: `No Profile Data Found` });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

const fetchProfileById = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile !== null && Object.keys(profile).length > 0) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: "Profile Not Found" });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

const profileLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const profile = await Profile.findOne({ username: email });

  if (profile && (await profile.matchPassword(password))) {
    res.status(200).json({ profile, token: generateToken(profile._id) });
  } else {
    res.status(400).json({ message: "Invalid email or password!" });
  }
});

const createProfile = (req, res) => {
  try {
    upload(req, res, (err) => {
      Profile.findOne({
        username: req.body.username,
      })
        .then((profile) => {
          if (profile) {
            res.status(409).json({ message: "User Name Already Exists" });
          } else {
            Profile.create({
              First_Name: req.body.First_Name,
              Last_Name: req.body.Last_Name,
              Birthday: Date(req.body.Birthday),
              Gender: req.body.Gender,
              City: req.body.City,
              Country: req.body.Country,
              Contact_No: Number(req.body.Contact_No),
              profileImage: req.file.filename,
              username: req.body.username,
              password: req.body.password,
              Available_Day: req.body.Available_Day,
              Available_Date: Date(req.body.Available_Date),
              Available_STime: Number(req.body.Available_STime),
              Available_ETime: Number(req.body.Available_ETime),
              UserType: req.body.UserType,
            })
              .then((newProfile) =>
                res.status(200).json({
                  message: "The New Profile Created Successfully!",
                  data: newProfile,
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

const updateProfile = (req, res) => {
  try {
    upload(req, res, (err) => {
      Profile.findById(req.params.id)
        .then((profile) => {
          if (profile) {
            profile.First_Name = req.body.First_Name || profile.First_Name;
            profile.Last_Name = req.body.Last_Name || profile.Last_Name;
            profile.Birthday = Date(req.body.Birthday) || profile.Birthday;
            profile.Gender = req.body.Gender || profile.Gender;
            profile.City = req.body.City || profile.City;
            profile.Country = req.body.Country || profile.Country;
            profile.Contact_No =
              Number(req.body.Contact_No) || profile.Contact_No;
            profile.profileImage = req?.file?.filename || profile.profileImage;
            profile.Available_Day =
              req.body.Available_Day || profile.Available_Day;
            profile.Available_Date =
              Date(req.body.Available_Date) || profile.Available_Date;
            profile.Available_STime =
              Date(req.body.Available_STime) || profile.Available_STime;
            profile.Available_ETime =
              Date(req.body.Available_ETime) || profile.Available_ETime;
            profile.UserType = req.body.UserType || profile.UserType;

            if (req.body.password) {
              profile.password = req.body.password;
            }

            profile
              .save()
              .then((updatedProfile) =>
                res.status(200).json({
                  message: "The Profile is Updated Successfully",
                  data: updatedProfile,
                })
              )
              .catch((err) =>
                res.status(400).json({ message: `Error: ${err}` })
              );
          } else {
            res.status(404).json({ message: "Profile Not Found" });
          }
        })
        .catch((err) => res.status(400).json({ message: `Error: ${err}` }));
    });
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
};

const deleteProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);

    if (profile !== null && Object.keys(profile).length > 0) {
      res
        .status(200)
        .json({ message: "The profile is DELETED!", data: profile });
    } else {
      res.status(404).json({ message: "Profile Not Found" });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

module.exports = {
  fetchAllProfiles,
  fetchProfileById,
  profileLogin,
  createProfile,
  updateProfile,
  deleteProfile,
};
