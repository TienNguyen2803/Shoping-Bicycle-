import ApiService from "./BaseServiceAxios";
import { API_ENDPOINT } from "../constants/index";
const url = "api/brand/";

export const getListBrand = () => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "list-brand";
  return ApiService.get(`${API_ENDPOINT}/${url}${end_url}`);
};

export const getBrandById = (id) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "details-brand";
  return ApiService.get(`${API_ENDPOINT}/${url}${end_url}/${id}`);
};


export const createBrand = (body) => {
  // let queryString = "";
  // if (Object.keys(body).length > 0) {
  //   queryString = `?${qs.stringify(body)}`;
  // }
  const end_url = "create-brand";
  return ApiService.post(`${API_ENDPOINT}/${url}${end_url}`, body);
};

export const updateBrand = (body) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "update-brand";
  return ApiService.put(`${API_ENDPOINT}/${url}${end_url}`, body);
};
export const disableBrand = (body) => {
  // let queryString = "";
  // if (Object.keys(param).length > 0) {
  //   queryString = `?${qs.stringify(param)}`;
  // }
  const end_url = "disable-brand";
  return ApiService.put(`${API_ENDPOINT}/${url}${end_url}`, body);
};
