import {
  FETCH_ALL_PETS,
  FETCH_PET_BY_ID,
  CREATE_PET,
  UPDATE_PET,
  DELETE_PET,
} from "constants/actionTypes";

const initState = {
  pets: [],
  petById: [],
  petCreate: {},
  petUpdate: {},
  petDelete: {},
};

const petReducer = (pet = initState, action) => {
  switch (action.type) {
    // pet
    case FETCH_ALL_PETS:
      return { ...pet, pets: action.payload };
    case FETCH_PET_BY_ID:
      return { ...pet, petById: action.payload };
    case CREATE_PET:
      return {
        ...pet,
        pets: [...pet.pets, action.payload],
        petCreate: action.payload,
      };
    case UPDATE_PET: {
      const newPets = [...pet.pets];
      newPets[pet.pets?.findIndex((item) => item._id === action.payload?._id)] = action.payload;
      return {
        ...pet,
        pets: newPets,
        petUpdate: action.payload,
      };
    }
    case DELETE_PET: {
      const filterPet = pet.pets?.filter((item) => item._id !== action.payload?._id);
      return {
        ...pet,
        pets: filterPet,
        petDelete: action.payload,
      };
    }
    default:
      return pet;
  }
};

export default petReducer;
