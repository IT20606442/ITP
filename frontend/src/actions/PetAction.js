import {
  FETCH_ALL_PETS,
  FETCH_PET_BY_ID,
  CREATE_PET,
  UPDATE_PET,
  DELETE_PET,
  ALL_LOADING,
  ALL_ALERT,
} from "constants/actionTypes";
import * as api from "services/PetService";

export const fetchAllPets = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Loading Pets..." });
    const data = await api.fetchAllPets();
    if (data?.status === 200) {
      dispatch({ type: FETCH_ALL_PETS, payload: data?.data });
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

export const fetchPetById = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Loading Pet..." });
    const params = {
      params: formData._id,
    };
    const data = await api.fetchPetById(params);
    if (data?.status === 200) {
      dispatch({ type: FETCH_PET_BY_ID, payload: data?.data });
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

export const createPet = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Creating Pet..." });
    const newFormData = new FormData();
    newFormData.append("Pet_Name", formData.Pet_Name);
    newFormData.append("Mnumber", formData.Mnumber);
    newFormData.append("Hnumber", formData.Hnumber);
    newFormData.append("Breed", formData.Breed);
    newFormData.append("PetAge", formData.PetAge);
    newFormData.append("file", formData.file);
    const params = {
      body: newFormData,
      params: null,
    };
    const data = await api.createPet(params);
    if (data?.status === 200) {
      dispatch({ type: CREATE_PET, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Pet Created Successfully!",
          timeOut: 5000,
        },
      });
      router("/");
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

export const updatePet = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Updating Pet..." });
    const newFormData = new FormData();
    newFormData.append("id", formData._id);
    newFormData.append("Pet_Name", formData.Pet_Name);
    newFormData.append("Mnumber", formData.Mnumber);
    newFormData.append("Hnumber", formData.Hnumber);
    newFormData.append("Breed", formData.Breed);
    newFormData.append("PetAge", formData.PetAge);
    newFormData.append("file", formData.file);
    const params = {
      body: newFormData,
      params: formData._id,
    };
    const data = await api.updatePet(params);
    if (data?.status === 200) {
      dispatch({ type: UPDATE_PET, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Pet updated successfully!",
          timeOut: 5000,
        },
      });
      router("/");
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

export const deletePet = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Deleting Pet..." });
    const params = {
      params: formData._id,
    };
    const data = await api.deletePet(params);
    if (data?.status === 200) {
      dispatch({ type: DELETE_PET, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Pet Deleted Successfully!",
          timeOut: 5000,
        },
      });
      router("/");
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
