const asyncHandler = require("express-async-handler");
const Article = require("../models/articleModel");
const { upload } = require("../middlewares/uploadMiddleware");

const fetchAllArticles = asyncHandler(async (req, res) => {
  try {
    const fetchAllArticles = await Article.find();
    if (fetchAllArticles !== null && Object.keys(fetchAllArticles).length > 0) {
      res.status(200).json(fetchAllArticles);
    } else {
      res.status(404).json({ message: `No Article Data Found` });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

const fetchArticleById = asyncHandler(async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article !== null && Object.keys(article).length > 0) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "Article Record Not Found" });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

const createArticle = (req, res) => {
  try {
    upload(req, res, (err) => {
      Article.create({
        title: req.body.title,
        article: req.body.article,
        authorname: req.body.authorname,
        articleImage: req.file.filename,
      })
        .then(() =>
          res
            .status(200)
            .json({ message: "The New Article Created Successfully!" })
        )
        .catch((err) => res.status(400).json({ message: `Error: ${err}` }));
    });
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
};

const updateArticle = (req, res) => {
  try {
    upload(req, res, (err) => {
      Article.findById(req.params.id)
        .then((article) => {
          if (article) {
            article.title = req.body.title || article.title;
            article.article = req.body.article || article.article;
            article.authorname = req.body.authorname || article.authorname;
            article.articleImage = req?.file?.filename || article.articleImage;

            if (req.body.password) {
              article.password = req.body.password;
            }

            article
              .save()
              .then(() =>
                res
                  .status(200)
                  .json({ message: "The Article is Updated Successfully" })
              )
              .catch((err) =>
                res.status(400).json({ message: `Error: ${err}` })
              );
          } else {
            res.status(404).json({ message: "Article Not Found" });
          }
        })
        .catch((err) => res.status(400).json({ message: `Error: ${err}` }));
    });
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
};

const deleteArticle = asyncHandler(async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (article !== null && Object.keys(article).length > 0) {
      res.status(200).json({ message: "The Article Record is DELETED!" });
    } else {
      res.status(404).json({ message: "Article Record Not Found" });
    }
  } catch (err) {
    res.status(417).json({ message: `Error: ${err}` });
  }
});

module.exports = {
  fetchAllArticles,
  fetchArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
