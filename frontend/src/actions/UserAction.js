import {
  FETCH_ALL_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  ALL_LOADING,
  ALL_ALERT,
} from "constants/actionTypes";
import * as api from "services/UserService";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Loading Users..." });
    const data = await api.fetchAllUsers();
    if (data?.status === 200) {
      dispatch({ type: FETCH_ALL_USERS, payload: data?.data });
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

export const createUser = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Creating User..." });
    const newFormData = new FormData();
    newFormData.append("fname", formData.fname);
    newFormData.append("lname", formData.lname);
    newFormData.append("email", formData.email);
    newFormData.append("password", formData.password);
    newFormData.append("mnumber", formData.mnumber);
    newFormData.append("hno", formData.hno);
    newFormData.append("street", formData.street);
    newFormData.append("city", formData.city);
    newFormData.append("province", formData.province);
    newFormData.append("file", formData.file);
    const params = {
      body: newFormData,
      params: null,
    };
    const data = await api.createUser(params);
    if (data?.status === 200) {
      dispatch({ type: CREATE_USER, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "User Created Successfully!",
          timeOut: 5000,
        },
      });
      router("/pages/user");
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

export const updateUser = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Updating User..." });
    const newFormData = new FormData();
    newFormData.append("id", formData._id);
    newFormData.append("fname", formData.fname);
    newFormData.append("lname", formData.lname);
    newFormData.append("email", formData.email);
    newFormData.append("password", formData.password);
    newFormData.append("mnumber", formData.mnumber);
    newFormData.append("hno", formData.hno);
    newFormData.append("street", formData.street);
    newFormData.append("city", formData.city);
    newFormData.append("province", formData.province);
    newFormData.append("file", formData.file);
    const params = {
      body: newFormData,
      params: formData._id,
    };
    const data = await api.updateUser(params);
    if (data?.status === 200) {
      dispatch({ type: UPDATE_USER, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "User updated successfully!",
          timeOut: 5000,
        },
      });
      router("/pages/user");
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

export const deleteUser = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Deleting User..." });
    const params = {
      params: formData._id,
    };
    const data = await api.deleteUser(params);
    if (data?.status === 200) {
      dispatch({ type: DELETE_USER, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "User Deleted Successfully!",
          timeOut: 5000,
        },
      });
      router("/pages/user");
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
