const { baseService } = require("./baseService");

class UserService extends baseService {
  // constructor() {
  //   super();
  // }

  login = (data) => {
    return this.post(`/Users/signin`, data);
  };
  signup = (data) => {
    return this.post(`/Users/signup`, data);
  };
  editUser = (data) => {
    return this.put(`/Users/editUser`, data);
  };
  

  getUserByProjectId = (idProject) => {
    return this.get(`/Users/getUserByProjectId?idProject=${idProject}`);
  };
  getUser = (key = "") => {
    if (key.trim() === "") {
      return this.get(`/Users/getUser`);
    }
    return this.get(`/Users/getUser?keyword=${key}`);
  };
}

export const userService = new UserService();
