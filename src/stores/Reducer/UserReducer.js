import {
  GET_ALL_USER_PROJECT,
  LOGIN,
  SEARCH_USER,
} from "stores/Types/UserTypes";
import { USER_LOGIN } from "utils/contants";

let userLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
  userLogin: userLogin,
  userProject: [],
  userSearch: [
    // {
    //   userId: 827,
    //   name: "ca map shark tank",
    //   avatar: "https://ui-avatars.com/api/?name=ca map shark tank",
    //   email: "12345@gmail.com",
    //   phoneNumber: "1234567",
    // },
  ],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, userLogin: action.userLogin };

    case GET_ALL_USER_PROJECT:
      return { ...state, userProject: action.userProject };
    case SEARCH_USER:
      return { ...state, userSearch: action.userSearch };
    case "RESET_USER_SEARCH": {
      return { ...state, userSearch: [] };
    }
    default:
      return state;
  }
};
