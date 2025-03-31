import {
  GET_ALL_USER_PROJECT,
  LOGIN,
  RESET_USER_SEARCH,
  SEARCH_USER,
  User,
  UserProject,
  UserSearch,
  UserState,
} from "stores/Types/UserTypes";
import { USER_LOGIN } from "utils/contants";

interface UserAction {
  type: string;
  userLogin?: User;
  userProject?: UserProject[];
  userSearch?: UserSearch[];
}

let userLogin = {} as User;
if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN) || "{}");
}

const initialState: UserState = {
  userLogin: userLogin,
  userProject: [],
  userSearch: [],
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case LOGIN:
      return { ...state, userLogin: action.userLogin || state.userLogin };

    case GET_ALL_USER_PROJECT:
      return { ...state, userProject: action.userProject || [] };

    case SEARCH_USER:
      return { ...state, userSearch: action.userSearch || [] };

    case RESET_USER_SEARCH:
      return { ...state, userSearch: [] };

    default:
      return state;
  }
};
