import { AUTH, ALL_LOADING, ALL_ALERT } from "constants/actionTypes";
import * as api from "services/AuthService";

export const userLogin = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Logging you in..." });
    const authData = await api.userLogin(formData);
    if (authData?.status === 200 && authData?.data?.token) {
      localStorage.setItem("token", authData?.data?.token);
      localStorage.setItem("userDetails", JSON.stringify(authData?.data));
      dispatch({ type: AUTH, payload: authData?.data });
      dispatch({ type: ALL_LOADING, payload: false });
      if (localStorage.getItem("token")) router("/");
    } else {
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "warning",
          title: "You Can Not Login!",
          message: "User Details Not Found...!",
          timeOut: 5000,
        },
      });
      router("/auth/signin");
    }
  } catch (error) {
    dispatch({ type: ALL_LOADING, payload: false });
    dispatch({
      type: ALL_ALERT,
      payload: {
        state: true,
        model: "error",
        title: "Error!",
        message: "An error occurred. Please try again later...!",
        timeOut: 5000,
      },
    });
    router("/auth/signin");
  }
};

export const vetLogin = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOADING, payload: "Logging you in..." });
    const authData = await api.vetLogin(formData);
    if (authData?.status === 200 && authData?.data?.token) {
      const profile = authData?.data?.profile;
      profile.token = authData?.data?.token;
      localStorage.setItem("token", profile?.token);
      localStorage.setItem("userDetails", JSON.stringify(profile));
      dispatch({ type: AUTH, payload: profile });
      dispatch({ type: ALL_LOADING, payload: false });
      if (localStorage.getItem("token")) router("/");
    } else {
      dispatch({ type: ALL_LOADING, payload: false });
      dispatch({
        type: ALL_ALERT,
        payload: {
          state: true,
          model: "warning",
          title: "You Can Not Login!",
          message: "User Details Not Found...!",
          timeOut: 5000,
        },
      });
      router("/auth/signin");
    }
  } catch (error) {
    dispatch({ type: ALL_LOADING, payload: false });
    dispatch({
      type: ALL_ALERT,
      payload: {
        state: true,
        model: "error",
        title: "Error!",
        message: "An error occurred. Please try again later...!",
        timeOut: 5000,
      },
    });
    router("/auth/signin");
  }
};
