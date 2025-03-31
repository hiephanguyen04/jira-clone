export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const GET_ALL_USER_PROJECT = "GET_ALL_USER_PROJECT";
export const SEARCH_USER = "SEARCH_USER";
export const RESET_USER_SEARCH = "RESET_USER_SEARCH";

export interface User {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  avatar: string;
  accessToken: string;
}

export interface UserProject {
  userId: number;
  name: string;
  avatar: string;
}

export interface UserSearch {
  userId: number;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
}

export interface UserState {
  userLogin: User;
  userProject: UserProject[];
  userSearch: UserSearch[];
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignupParams {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}
