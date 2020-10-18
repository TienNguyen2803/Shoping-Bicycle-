import * as Types from "constants/ActionTypes";

const INIT_STATE = {
  product: {},
  listProduct: [],
  listProductFilter: [],
  flag : false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case Types.GET_LIST_PRODUCT_SUCCESS: {
      const listProduct = action.payload.data.data.data;
      return {
        ...state,
        listProduct,
      };
    }
    case Types.CREATE_PRODUCT_SUCCESS: {
      const product = action.payload.data.data.data;
      return {
        ...state,
        product,
      };
    }
    case Types.DISABLE_PRODUCT_SUCCESS: {
      const product = action.payload.data.data;
      return {
        ...state,
        product,
      };
    }
    case Types.GET_PRODUCT_SUCCESS: {
      const id = action.payload.id;
      let product = state.listProduct.find((x) => x.productID === parseInt(id));
      return {
        ...state,
        product,
      };
    }
    case Types.FILTER_PRODUCT_SUCCESS: {
      const keyword = action.payload.data.keyword;
      const list = state.listProduct.filter((o) =>
        o.productName
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(keyword.toLowerCase().replace(/\s/g, ""))
      );
      let flag = false;
      let newList = [];
      if (list.length === 0) {
        flag = true;
      } else if (keyword === "") {
        newList = state.listProduct;
      } else {
        newList = state.listProduct.filter((o) =>
          o.productName
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(keyword.toLowerCase().replace(/\s/g, ""))
        );
      }
      return {
        ...state,
        listProductFilter: newList,
        flag : flag
      };
    }
    default:
      return state;
  }
};
