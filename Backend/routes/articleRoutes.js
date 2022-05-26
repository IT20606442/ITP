const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  fetchAllArticles,
  fetchArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleControllers");

router.route("/view").get(fetchAllArticles);

router.route("/get/:id").get(fetchArticleById);

router.route("/add").post(createArticle);

router.route("/update/:id").put(updateArticle);

router.route("/delete/:id").delete(deleteArticle);

module.exports = router;
