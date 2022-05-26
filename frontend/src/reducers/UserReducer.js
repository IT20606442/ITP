import { FETCH_ALL_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from "constants/actionTypes";

const initState = {
  users: [],
  userCreate: {},
  userUpdate: {},
  userDelete: {},
};
//user-reducer
const userReducer = (user = initState, action) => {
  switch (action.type) {
    // user
    case FETCH_ALL_USERS:
      return { ...user, users: action.payload };
    case CREATE_USER:
      return {
        ...user,
        users: [...user.users, action.payload],
        userCreate: action.payload,
      };
    case UPDATE_USER: {
      const newUser = [...user.users];
      newUser[user.users?.findIndex((item) => item._id === action.payload?._id)] = action.payload;
      return {
        ...user,
        users: newUser,
        userUpdate: action.payload,
      };
    }
    case DELETE_USER: {
      const filterUser = user.users?.filter((item) => item._id !== action.payload?._id);
      return {
        ...user,
        users: filterUser,
        userDelete: action.payload,
      };
    }
    default:
      return user;
  }
};

export default userReducer;
