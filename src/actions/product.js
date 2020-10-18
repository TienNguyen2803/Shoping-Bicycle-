import * as Types from "../constants/ActionTypes";

export const getListProduct = () => {
  return {
    type: Types.GET_LIST_PRODUCT,
  };
};

export const getListProductSuccess = (data) => {
  return {
    type: Types.GET_LIST_PRODUCT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const createProductRequest = (data) => {
  return {
    type: Types.CREATE_PRODUCT,
    payload: {
      data,
    },
  };
};

export const createProductSuccess = (data) => {
  return {
    type: Types.CREATE_PRODUCT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getProductRequest = (id) => {
  return {
    type: Types.GET_PRODUCT,
    payload: {
      id,
    },
  };
};

export const getProductSuccess = (id) => {
  return {
    type: Types.GET_PRODUCT_SUCCESS,
    payload: {
      id,
    },
  };
};

export const updateProductRequest = (data) => {
  return {
    type: Types.UPDATE_PRODUCT,
    payload: {
      data,
    },
  };
};

export const updateProductSuccess = (data) => {
  return {
    type: Types.UPDATE_PRODUCT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const disableProductRequest = (data) => {
  return {
    type: Types.DISABLE_PRODUCT,
    payload: {
      data,
    },
  };
};

export const disableProductSuccess = (data) => {
  return {
    type: Types.DISABLE_PRODUCT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const filterProductRequest = (keyword) => {
  return {
    type: Types.FILTER_PRODUCT,
    payload: {
      keyword,
    },
  };
};

export const filterProductSuccess = (data) => {
  return {
    type: Types.FILTER_PRODUCT_SUCCESS,
    payload: {
      data,
    },
  };
};
