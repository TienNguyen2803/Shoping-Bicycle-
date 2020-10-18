import ApiService from "./BaseServiceAxios";
import { API_ENDPOINT } from "../constants/index";
const url = "api/account/";

export const getListAccount = () => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "list-account";
  return ApiService.get(`${API_ENDPOINT}/${url}${end_url}`);
};

export const getAccountById = (id) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "details-account";
  return ApiService.get(`${API_ENDPOINT}/${url}${end_url}/${id}`);
};


export const createAccount = (body) => {
  // let queryString = "";
  // if (Object.keys(body).length > 0) {
  //   queryString = `?${qs.stringify(body)}`;
  // }
  const end_url = "create-account";
  return ApiService.post(`${API_ENDPOINT}/${url}${end_url}`, body);
};

export const updateAccount = (body) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "update-account";
  return ApiService.put(`${API_ENDPOINT}/${url}${end_url}`, body);
};
export const disableAccount = (body) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "disable-account";
  return ApiService.put(`${API_ENDPOINT}/${url}${end_url}`, body);
};
