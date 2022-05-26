import {
  FETCH_ALL_VETS,
  FETCH_VET_BY_ID,
  CREATE_VET,
  UPDATE_VET,
  DELETE_VET,
} from "constants/actionTypes";

const initState = {
  vets: [],
  vetById: [],
  vetCreate: {},
  vetUpdate: {},
  vetDelete: {},
};

const vetReducer = (vet = initState, action) => {
  switch (action.type) {
    // vet
    case FETCH_ALL_VETS:
      return { ...vet, vets: action.payload };
    case FETCH_VET_BY_ID:
      return { ...vet, vetById: action.payload };
    case CREATE_VET:
      return {
        ...vet,
        vets: [...vet.vets, action.payload],
        vetCreate: action.payload,
      };
    case UPDATE_VET: {
      const newVet = [...vet.vets];
      newVet[vet.vets?.findIndex((item) => item._id === action.payload?._id)] = action.payload;
      return {
        ...vet,
        vets: newVet,
        vetUpdate: action.payload,
      };
    }
    case DELETE_VET: {
      const filterVet = vet.vets?.filter((item) => item._id !== action.payload?._id);
      return {
        ...vet,
        vets: filterVet,
        vetDelete: action.payload,
      };
    }
    default:
      return vet;
  }
};

export default vetReducer;
