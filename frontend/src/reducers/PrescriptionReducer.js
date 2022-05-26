import {
  FETCH_ALL_PRESCRIPTIONS,
  FETCH_PRESCRIPTION_BY_ID,
  CREATE_PRESCRIPTION,
  UPDATE_PRESCRIPTION,
  DELETE_PRESCRIPTION,
} from "constants/actionTypes";

const initState = {
  prescriptions: [],
  prescriptionById: [],
  prescriptionCreate: {},
  prescriptionUpdate: {},
  prescriptionDelete: {},
};

const prescriptionReducer = (prescription = initState, action) => {
  switch (action.type) {
    // prescription
    case FETCH_ALL_PRESCRIPTIONS:
      return { ...prescription, prescriptions: action.payload };
    case FETCH_PRESCRIPTION_BY_ID:
      return { ...prescription, prescriptionById: action.payload };
    case CREATE_PRESCRIPTION:
      return {
        ...prescription,
        prescriptions: [...prescription.prescriptions, action.payload],
        prescriptionCreate: action.payload,
      };
    case UPDATE_PRESCRIPTION: {
      const newPrescriptions = [...prescription.prescriptions];
      newPrescriptions[
        prescription.prescriptions?.findIndex((item) => item._id === action.payload?._id)
      ] = action.payload;
      return {
        ...prescription,
        prescriptions: newPrescriptions,
        prescriptionUpdate: action.payload,
      };
    }
    case DELETE_PRESCRIPTION: {
      const filterPrescription = prescription.prescriptions?.filter(
        (item) => item._id !== action.payload?._id
      );
      return {
        ...prescription,
        prescriptions: filterPrescription,
        prescriptionDelete: action.payload,
      };
    }
    default:
      return prescription;
  }
};

export default prescriptionReducer;
