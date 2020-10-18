import * as Types from "constants/ActionTypes";

const INIT_STATE = {
  brand: {},
  listBrand: [],
  listBrandFilter: [],
  keyword : null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case Types.GET_LIST_BRAND_SUCCESS: {
      const listBrand = action.payload.data.data.data;
      return {
        ...state,
        listBrand,
      };
    }
    case Types.CREATE_BRAND_SUCCESS: {
      const brand = action.payload.data.data.data;
      return {
        ...state,
        brand,
      };
    }
    case Types.GET_BRAND_SUCCESS: {
      const brand = action.payload.id.data.data;
      return {
        ...state,
        brand,
      };
    }
    case Types.DISABLE_BRAND_SUCCESS: {
      const brand = action.payload.data.data;
      return {
        ...state,
        brand,
      };
    }
    case Types.FILTER_BRAND_SUCCESS: {
      const keyword = action.payload.data.keyword;
      let newList = [];
      if (keyword === "") {
        newList = state.listBrand;
      } else {
        newList = state.listBrand.filter((o) =>
          (
            o.brandName.toLowerCase().replace(/\s/g, "")
          ).includes(keyword.toLowerCase().replace(/\s/g, ""))
        );
      }
      return {
        ...state,
        listBrandFilter: newList,
        keyword : keyword
      };
    }
    default:
      return state;
  }
};
