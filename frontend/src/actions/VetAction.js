import {
  FETCH_ALL_VETS,
  FETCH_VET_BY_ID,
  CREATE_VET,
  UPDATE_VET,
  DELETE_VET,
  ALL_LOADING,
  ALL_ALERT,
} from "constants/actionTypes";
import * as api from "services/VetService";

export const fetchAllVets = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Loading Vets..." });
    const data = await api.fetchAllVets();
    if (data?.status === 200) {
      dispatch({ type: FETCH_ALL_VETS, payload: data?.data });
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

export const fetchVetById = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Loading Vet..." });
    const params = {
      params: formData._id,
    };
    const data = await api.fetchVetById(params);
    if (data?.status === 200) {
      dispatch({ type: FETCH_VET_BY_ID, payload: data?.data });
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

export const createVet = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Creating Vet..." });
    const newFormData = new FormData();
    newFormData.append("First_Name", formData.First_Name);
    newFormData.append("Last_Name", formData.Last_Name);
    newFormData.append("Birthday", formData.Birthday);
    newFormData.append("Gender", formData.Gender);
    newFormData.append("City", formData.City);
    newFormData.append("Country", formData.Country);
    newFormData.append("Contact_No", formData.Contact_No);
    newFormData.append("username", formData.username);
    newFormData.append("password", formData.password);
    newFormData.append("Available_Day", formData.Available_Day);
    newFormData.append("Available_Date", formData.Available_Date);
    newFormData.append("Available_STime", formData.Available_STime);
    newFormData.append("Available_ETime", formData.Available_ETime);
    newFormData.append("UserType", formData.UserType);
    newFormData.append("file", formData.file);
    const params = {
      body: newFormData,
      params: formData,
    };
    const data = await api.createVet(params);
    if (data?.status === 200) {
      dispatch({ type: CREATE_VET, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Vet Created Successfully!",
          timeOut: 5000,
        },
      });
      router("/pages/Vet");
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

export const updateVet = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Updating Vet..." });
    const newFormData = new FormData();
    newFormData.append("id", formData._id);
    newFormData.append("First_Name", formData.First_Name);
    newFormData.append("Last_Name", formData.Last_Name);
    newFormData.append("Birthday", formData.Birthday);
    newFormData.append("Gender", formData.Gender);
    newFormData.append("City", formData.City);
    newFormData.append("Country", formData.Country);
    newFormData.append("Contact_No", formData.Contact_No);
    newFormData.append("username", formData.username);
    newFormData.append("password", formData.password);
    newFormData.append("Available_Day", formData.Available_Day);
    newFormData.append("Available_Date", formData.Available_Date);
    newFormData.append("Available_STime", formData.Available_STime);
    newFormData.append("Available_ETime", formData.Available_ETime);
    newFormData.append("UserType", formData.UserType);
    newFormData.append("file", formData.file);
    const params = {
      body: newFormData,
      params: formData._id,
    };
    const data = await api.updateVet(params);
    if (data?.status === 200) {
      dispatch({ type: UPDATE_VET, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Vet updated successfully!",
          timeOut: 5000,
        },
      });
      router("/pages/Vet");
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

export const deleteVet = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Deleting Vet..." });
    const params = {
      params: formData._id,
    };
    const data = await api.deleteVet(params);
    if (data?.status === 200) {
      dispatch({ type: DELETE_VET, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Vet Deleted Successfully!",
          timeOut: 5000,
        },
      });
      router("/pages/Vet");
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
