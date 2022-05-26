const asyncHandler = require("express-async-handler");
const Prescription = require("../models/prescriptionModel");

const fetchAllPrescriptions = asyncHandler(async (req, res) => {
  try {
    const fetchAllPrescriptions = await Prescription.find();
    if (
      fetchAllPrescriptions !== null &&
      Object.keys(fetchAllPrescriptions).length > 0
    ) {
      res.status(200).json(fetchAllPrescriptions);
    } else {
      res.status(404).json({ message: `No Prescription Data Found` });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

const fetchPrescriptionById = asyncHandler(async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (prescription !== null && Object.keys(prescription).length > 0) {
      res.status(200).json(prescription);
    } else {
      res.status(404).json({ message: "Prescription Record Not Found" });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

const createPrescription = asyncHandler(async (req, res) => {
  try {
    const newPrescription = await Prescription.create({
      medicationId: req.body.medicationId,
      medicationQuantity: Number(req.body.medicationQuantity),
      other: req.body.other,
      description: req.body.description,
      nextMeetup: Date(req.body.nextMeetup),
      petProfile: req.body.petProfile,
    })
      .then(() => {
        if (
          newPrescription !== null &&
          Object.keys(newPrescription).length > 0
        ) {
          res.status(200).json({
            message: "The New Prescription Record Created Successfully!",
            data: newPrescription,
          });
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

const updatePrescription = asyncHandler(async (req, res) => {
  try {
    const updatedPrescription = await updatePrescription
      .findByIdAndUpdate(req.params.id, {
        medicationId: req.body.medicationId,
        medicationQuantity: Number(req.body.medicationQuantity),
        other: req.body.other,
        description: req.body.description,
        nextMeetup: Date(req.body.nextMeetup),
        petProfile: req.body.petProfile,
      })
      .then(() => {
        if (
          updatedPrescription !== null &&
          Object.keys(updatedPrescription).length > 0
        ) {
          res.status(200).json({
            message: "The Prescription Record is Updated Successfully",
            data: updatedPrescription,
          });
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

const deletePrescription = asyncHandler(async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);

    if (prescription !== null && Object.keys(prescription).length > 0) {
      res.status(200).json({
        message: "The Prescription Record is DELETED!",
        data: prescription,
      });
    } else {
      res.status(404).json({ message: "Prescription Record Not Found" });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

module.exports = {
  fetchAllPrescriptions,
  fetchPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
};
