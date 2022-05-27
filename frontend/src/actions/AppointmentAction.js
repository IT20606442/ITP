import {
  FETCH_ALL_APPOINTMENTS,
  FETCH_APPOINTMENT_BY_ID,
  CREATE_APPOINTMENT,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  ALL_LOADING,
  ALL_ALERT,
} from "constants/actionTypes";
import * as api from "services/AppointmentService";

export const fetchAllAppointments = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Loading Appointments..." });
    const data = await api.fetchAllAppointments();
    if (data?.status === 200) {
      dispatch({ type: FETCH_ALL_APPOINTMENTS, payload: data?.data });
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

export const fetchAppointmentById = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Loading Appointment..." });
    const params = {
      params: formData._id,
    };
    const data = await api.fetchAppointmentById(params);
    if (data?.status === 200) {
      dispatch({ type: FETCH_APPOINTMENT_BY_ID, payload: data?.data });
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

export const createAppointment = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Creating Appointment..." });
    const params = {
      body: formData,
      params: null,
    };
    const data = await api.createAppointment(params);
    if (data?.status === 200) {
      dispatch({ type: CREATE_APPOINTMENT, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Appointment Created Successfully!",
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

export const updateAppointment = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Updating Appointments..." });
    const params = {
      body: formData,
      params: formData._id,
    };
    const data = await api.updateAppointment(params);
    if (data?.status === 200) {
      dispatch({ type: UPDATE_APPOINTMENT, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Appointment updated successfully!",
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

export const deleteAppointment = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Deleting Appointments..." });
    const params = {
      params: formData._id,
    };
    const data = await api.deleteAppointment(params);
    if (data?.status === 200) {
      dispatch({ type: DELETE_APPOINTMENT, payload: data?.data?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "success",
          title: "Success!",
          message: data?.data?.message || "Appointment Deleted Successfully!",
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
