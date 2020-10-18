import ApiService from "./BaseServiceAxios";
import { API_ENDPOINT } from "../constants/index";
const url = "api/category/";

export const getListCategory = () => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "list-category";
  return ApiService.get(`${API_ENDPOINT}/${url}${end_url}`);
};

export const getCategoryById = (id) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "details-category";
  return ApiService.get(`${API_ENDPOINT}/${url}${end_url}/${id}`);
};


export const createCategory = (body) => {
  // let queryString = "";
  // if (Object.keys(body).length > 0) {
  //   queryString = `?${qs.stringify(body)}`;
  // }
  const end_url = "create-category";
  return ApiService.post(`${API_ENDPOINT}/${url}${end_url}`, body);
};

export const updateCategory = (body) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "update-category";
  return ApiService.put(`${API_ENDPOINT}/${url}${end_url}`, body);
};
export const disableCategory = (body) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "disable-category";
  return ApiService.put(`${API_ENDPOINT}/${url}${end_url}`, body);
};
