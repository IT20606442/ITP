const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  fetchAllInventoryItems,
  fetchInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require("../controllers/inventoryControllers");

//get all
router.route("/view").get(fetchAllInventoryItems);
//view
router.route("/get/:id").get(fetchInventoryItemById);
//create
router.route("/add").post(createInventoryItem);

//update
router.route("/update/:id").put(updateInventoryItem);
//delete
router.route("/delete/:id").delete(deleteInventoryItem);

module.exports = router;
