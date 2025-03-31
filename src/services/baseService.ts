import Axios, { AxiosResponse } from "axios";
import { DOMAIN_JIRA, TOKEN } from "utils/contants";

export class baseService {
  put = <T, R>(url: string, model: T): Promise<AxiosResponse<R>> => {
    return Axios({
      url: `${DOMAIN_JIRA}${url}`,
      method: "PUT",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //JWT
    });
  };

  post = <T, R>(url: string, model: T): Promise<AxiosResponse<R>> => {
    return Axios({
      url: `${DOMAIN_JIRA}${url}`,
      method: "POST",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //JWT
    });
  };

  get = <R>(url: string): Promise<AxiosResponse<R>> => {
    return Axios({
      url: `${DOMAIN_JIRA}${url}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };

  delete = <R>(url: string): Promise<AxiosResponse<R>> => {
    return Axios({
      url: `${DOMAIN_JIRA}${url}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };
}
