import {
  FETCH_ALL_ARTICLES,
  FETCH_ARTICLE_BY_ID,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
} from "constants/actionTypes";

const initState = {
  articles: [],
  articleById: [],
  articleCreate: {},
  articleUpdate: {},
  articleDelete: {},
};

const articleReducer = (article = initState, action) => {
  switch (action.type) {
    // article
    case FETCH_ALL_ARTICLES:
      return { ...article, articles: action.payload };
    case FETCH_ARTICLE_BY_ID:
      return { ...article, articleById: action.payload };
    case CREATE_ARTICLE:
      return {
        ...article,
        articles: [...article.articles, action.payload],
        articleCreate: action.payload,
      };
    case UPDATE_ARTICLE: {
      const newArticles = [...article.articles];
      newArticles[article.articles?.findIndex((item) => item._id === action.payload?._id)] =
        action.payload;
      return {
        ...article,
        articles: newArticles,
        articleUpdate: action.payload,
      };
    }
    case DELETE_ARTICLE: {
      const filterArticle = article.articles?.filter((item) => item._id !== action.payload?._id);
      return {
        ...article,
        articles: filterArticle,
        articleDelete: action.payload,
      };
    }
    default:
      return article;
  }
};

export default articleReducer;
