import { AUTH, LOGOUT, ALL_LOADING, ALL_ALERT, REMOVE_ALERT } from "constants/actionTypes";

const authData = JSON.parse(localStorage.getItem("userDetails"));

const initState = {
  authData: authData || {},
  loading: true,
  all_alert: [],
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      };
    case LOGOUT:
      return { ...state, authData: {}, loading: false, all_alert: [] };
    case ALL_LOADING:
      return { ...state, loading: action.payload };
    case ALL_ALERT:
      return {
        ...state,
        all_alert: [...state.all_alert, action.payload],
      };
    case REMOVE_ALERT: {
      const newAllAlert = [...state.all_alert];
      newAllAlert[action.payload].state = false;
      return { ...state, all_alert: newAllAlert };
    }
    default:
      return state;
  }
};

export default authReducer;
