import ApiService from "./BaseServiceAxios";
import { API_ENDPOINT } from "../constants/index";
const url = "api/product/";

export const getListProduct = () => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "list-product";
  return ApiService.get(`${API_ENDPOINT}/${url}${end_url}`);
};

export const getProductById = (id) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "details-product";
  return ApiService.get(`${API_ENDPOINT}/${url}${end_url}/${id}`);
};


export const createProduct = (body) => {
  // let queryString = "";
  // if (Object.keys(body).length > 0) {
  //   queryString = `?${qs.stringify(body)}`;
  // }
  const end_url = "create-product";
  return ApiService.post(`${API_ENDPOINT}/${url}${end_url}`, body);
};

export const updateProduct = (body) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "update-product";
  return ApiService.put(`${API_ENDPOINT}/${url}${end_url}`, body);
};
export const disableProduct = (body) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "disable-product";
  return ApiService.put(`${API_ENDPOINT}/${url}${end_url}`, body);
};
