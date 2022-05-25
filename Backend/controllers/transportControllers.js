const asyncHandler = require("express-async-handler");
const Transport = require("../models/transportModel");

const fetchAllTransports = asyncHandler(async (req, res) => {
  try {
    const fetchAllTransports = await Transport.find();
    if (
      fetchAllTransports !== null &&
      Object.keys(fetchAllTransports).length > 0
    ) {
      res.status(200).json(fetchAllTransports);
    } else {
      res.status(404).json({ message: `No Transport Data Found` });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

const fetchTransportById = asyncHandler(async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (transport !== null && Object.keys(transport).length > 0) {
      res.status(200).json(transport);
    } else {
      res.status(404).json({ message: "Transport Record Not Found" });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

const createTransport = asyncHandler(async (req, res) => {
  try {
    const newTransport = await Transport.create({
      Name: req.body.Name,
      Email: req.body.Email,
      Appoinmentid: req.body.Appoinmentid,
      Location: req.body.Location,
      Comments: req.body.Comments,
    })
      .then(() => {
        if (newTransport !== null && Object.keys(newTransport).length > 0) {
          res.status(200).json({
            message: "The New Transport Record Created Successfully!",
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

const updateTransport = asyncHandler(async (req, res) => {
  try {
    const updatedTransport = await updateTransport
      .findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        Email: req.body.Email,
        Appoinmentid: req.body.Appoinmentid,
        Location: req.body.Location,
        Comments: req.body.Comments,
      })
      .then(() => {
        if (
          updatedTransport !== null &&
          Object.keys(updatedTransport).length > 0
        ) {
          res.status(200).json({
            message: "The Transport Record is Updated Successfully",
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

const deleteTransport = asyncHandler(async (req, res) => {
  try {
    const transport = await Transport.findByIdAndDelete(req.params.id);

    if (transport !== null && Object.keys(transport).length > 0) {
      res.status(200).json({ message: "The Transport Record is DELETED!" });
    } else {
      res.status(404).json({ message: "Transport Record Not Found" });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

module.exports = {
  fetchAllTransports,
  fetchTransportById,
  createTransport,
  updateTransport,
  deleteTransport,
};
//Comments