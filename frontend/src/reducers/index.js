import { combineReducers } from "redux";
import { LOGOUT } from "../constants/actionTypes";

import appointment from "./AppointmentReducer";
import article from "./ArticleReducer";
import auth from "./AuthReducer";
import inventory from "./InventoryReducer";
import pet from "./PetReducer";
import prescription from "./PrescriptionReducer";
import transport from "./TransportReducer";
import user from "./UserReducer";
import vet from "./VetReducer";

const allReducers = combineReducers({
  appointment,
  article,
  auth,
  inventory,
  pet,
  prescription,
  transport,
  user,
  vet,
});

const reducers = (state, action) => {
  if (action.type === LOGOUT) {
    return allReducers(undefined, action);
  }

  return allReducers(state, action);
};

export default reducers;
