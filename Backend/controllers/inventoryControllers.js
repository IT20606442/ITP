const asyncHandler = require("express-async-handler");
let Inventory = require("../models/inventoryModel");
const { upload } = require("../middlewares/uploadMiddleware");

const fetchAllInventoryItems = asyncHandler(async (req, res) => {
  try {
    const fetchAllInventory = await Inventory.find();
    if (
      fetchAllInventory !== null &&
      Object.keys(fetchAllInventory).length > 0
    ) {
      res.status(200).json(fetchAllInventory);
    } else {
      res.status(404).json({ message: `No Inventory Data Found` });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});
const fetchInventoryItemById = asyncHandler(async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);
    if (inventoryItem !== null && Object.keys(inventoryItem).length > 0) {
      res.status(200).json(inventoryItem);
    } else {
      res.status(404).json({ message: "Inventory Item Not Found" });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});
const createInventoryItem = (req, res) => {
  try {
    upload(req, res, (err) => {
      Inventory.findOne({
        iteamName: req.body.iteamName,
      })
        .then((item) => {
          if (item) {
            res.status(409).json({ message: "Item Name Already Exists" });
          } else {
            Inventory.create({
              iteamId: `ID${(
                "00000" + parseInt(Date.now() / 400 - 4133026200)
              ).slice(-6)}`,
              iteamName: req.body.iteamName,
              category: req.body.category,
              date: req.body.date,
              price: req.body.price,
              quantity: Number(req.body.quantity),
              issuedQuantity: 0,
              brandName: req.body.brandName,
              image: req.file.filename,
            })
              .then((newInventory) =>
                res.status(200).json({
                  message: "The New Item Created Successfully!",
                  data: newInventory,
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
const updateInventoryItem = (req, res) => {
  try {
    upload(req, res, (err) => {
      Inventory.findById(req.params.id)
        .then((item) => {
          if (item) {
            item.iteamName = req.body.iteamName || item.iteamName;
            item.category = req.body.category || item.category;
            item.price = req.body.price || item.price;
            item.quantity = Number(req.body.quantity) || item.quantity;
            item.issuedQuantity =
              Number(req.body.issuedQuantity) || item.issuedQuantity;
            item.brandName = req.body.brandName || item.brandName;
            item.image = req?.file?.filename || item.image;

            item
              .save()
              .then((updatedInventory) =>
                res.status(200).json({
                  message: "The Item is Updated Successfully",
                  data: updatedInventory,
                })
              )
              .catch((err) =>
                res.status(400).json({ message: `Error: ${err}` })
              );
          } else {
            res.status(404).json({ message: "Item Not Found" });
          }
        })
        .catch((err) => res.status(400).json({ message: `Error: ${err}` }));
    });
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
};
const deleteInventoryItem = asyncHandler(async (req, res) => {
  try {
    const inventoryItem = await Inventory.findByIdAndDelete(
      req.params.id
    ).exec();

    if (inventoryItem !== null && Object.keys(nventoryItem).length > 0) {
      res.status(200).json({ message: "The Inventory Item is DELETED!" });
    } else {
      res
        .status(404)
        .json({ message: "Inventory Item Not Found", data: inventoryItem });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

module.exports = {
  fetchAllInventoryItems,
  fetchInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
