import {
  FETCH_ALL_ARTICLES,
  FETCH_ARTICLE_BY_ID,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  ALL_LOADING,
  ALL_ALERT,
} from "constants/actionTypes";
import * as api from "services/ArticleService";

export const fetchAllArticles = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Loading Articles..." });
    const data = await api.fetchAllArticles();
    if (data?.status === 200) {
      dispatch({ type: FETCH_ALL_ARTICLES, payload: data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
    } else {
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "warning",
          title: "Error!",
          message:
            ((data?.data?.msg || data?.statusText) && ". Please try again...!") ||
            "An error occurred. Please try again...!",
          timeOut: 5000,
        },
      });
    }
  } catch (error) {
    dispatch({ type: ALL_LOADING, payload: false });
    dispatch({
      type: ALL_ALERT,
      payload: {
        state: true,
        model: "error",
        title: "Error!",
        message:
          error?.response?.data?.message ||
          `Error!: ${error?.message}` ||
          "An error occurred. Please try again later...!",
        timeOut: 5000,
      },
    });
  }
};

export const fetchArticleById = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Loading Article..." });
    const params = {
      params: formData._id,
    };
    const data = await api.fetchArticleById(params);
    if (data?.status === 200) {
      dispatch({ type: FETCH_ARTICLE_BY_ID, payload: data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
    } else {
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "warning",
          title: "Error!",
          message:
            ((data?.data?.msg || data?.statusText) && ". Please try again...!") ||
            "An error occurred. Please try again...!",
          timeOut: 5000,
        },
      });
    }
  } catch (error) {
    dispatch({ type: ALL_LOADING, payload: false });
    dispatch({
      type: ALL_ALERT,
      payload: {
        state: true,
        model: "error",
        title: "Error!",
        message:
          error?.response?.data?.message ||
          `Error!: ${error?.message}` ||
          "An error occurred. Please try again later...!",
        timeOut: 5000,
      },
    });
  }
};

export const createArticle = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Creating Article..." });
    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("authorname", formData.authorname);
    newFormData.append("article", formData.article);
    newFormData.append("file", formData.file);
    const params = {
      body: newFormData,
      params: null,
    };
    const data = await api.createArticle(params);
    if (data?.status === 200) {
      dispatch({ type: CREATE_ARTICLE, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Article Created Successfully!",
          timeOut: 5000,
        },
      });
      router("/pages/articles");
    } else {
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "warning",
          title: "Error!",
          message:
            ((data?.data?.msg || data?.statusText) && ". Please try again...!") ||
            "An error occurred. Please try again...!",
          timeOut: 5000,
        },
      });
    }
  } catch (error) {
    dispatch({ type: ALL_LOADING, payload: false });
    dispatch({
      type: ALL_ALERT,
      payload: {
        state: true,
        model: "error",
        title: "Error!",
        message:
          error?.response?.data?.message ||
          `Error!: ${error?.message}` ||
          "An error occurred. Please try again later...!",
        timeOut: 5000,
      },
    });
  }
};

export const updateArticle = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Updating Article..." });
    const newFormData = new FormData();
    newFormData.append("id", formData._id);
    newFormData.append("title", formData.title);
    newFormData.append("authorname", formData.authorname);
    newFormData.append("article", formData.article);
    newFormData.append("file", formData.file);
    const params = {
      body: newFormData,
      params: formData._id,
    };
    const data = await api.updateArticle(params);
    if (data?.status === 200) {
      dispatch({ type: UPDATE_ARTICLE, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Article updated successfully!",
          timeOut: 5000,
        },
      });
      router("/pages/articles");
    } else {
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "warning",
          title: "Error!",
          message:
            ((data?.data?.msg || data?.statusText) && ". Please try again...!") ||
            "An error occurred. Please try again...!",
          timeOut: 5000,
        },
      });
    }
  } catch (error) {
    dispatch({ type: ALL_LOADING, payload: false });
    dispatch({
      type: ALL_ALERT,
      payload: {
        state: true,
        model: "error",
        title: "Error!",
        message:
          error?.response?.data?.message ||
          `Error!: ${error?.message}` ||
          "An error occurred. Please try again later...!",
        timeOut: 5000,
      },
    });
  }
};

export const deleteArticle = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Deleting Article..." });
    const params = {
      params: formData._id,
    };
    const data = await api.deleteArticle(params);
    if (data?.status === 200) {
      dispatch({ type: DELETE_ARTICLE, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Article Deleted Successfully!",
          timeOut: 5000,
        },
      });
      router("/pages/articles");
    } else {
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "warning",
          title: "Error!",
          message:
            ((data?.data?.msg || data?.statusText) && ". Please try again...!") ||
            "An error occurred. Please try again...!",
          timeOut: 5000,
        },
      });
    }
  } catch (error) {
    dispatch({ type: ALL_LOADING, payload: false });
    dispatch({
      type: ALL_ALERT,
      payload: {
        state: true,
        model: "error",
        title: "Error!",
        message:
          error?.response?.data?.message ||
          `Error!: ${error?.message}` ||
          "An error occurred. Please try again later...!",
        timeOut: 5000,
      },
    });
  }
};
