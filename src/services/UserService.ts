import { AxiosResponse } from "axios";
import {
  LoginParams,
  SignupParams,
  User,
  UserProject,
  UserSearch,
} from "stores/Types/UserTypes";
import { baseService } from "./baseService";

interface UserResponse {
  content: User;
  statusCode: number;
  message: string;
}

interface UserProjectResponse {
  content: UserProject[];
  statusCode: number;
  message: string;
}

interface UserSearchResponse {
  content: UserSearch[];
  statusCode: number;
  message: string;
}

class UserService extends baseService {
  login = (data: LoginParams): Promise<AxiosResponse<UserResponse>> => {
    return this.post(`/Users/signin`, data);
  };

  signup = (data: SignupParams): Promise<AxiosResponse<UserResponse>> => {
    return this.post(`/Users/signup`, data);
  };

  editUser = (data: Partial<User>): Promise<AxiosResponse<UserResponse>> => {
    return this.put(`/Users/editUser`, data);
  };

  getUserByProjectId = (
    idProject: number
  ): Promise<AxiosResponse<UserProjectResponse>> => {
    return this.get(`/Users/getUserByProjectId?idProject=${idProject}`);
  };

  getUser = (key: string = ""): Promise<AxiosResponse<UserSearchResponse>> => {
    if (key.trim() === "") {
      return this.get(`/Users/getUser`);
    }
    return this.get(`/Users/getUser?keyword=${key}`);
  };
}

export const userService = new UserService();
