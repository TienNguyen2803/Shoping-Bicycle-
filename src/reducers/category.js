import * as Types from "constants/ActionTypes";

const INIT_STATE = {
  category: {},
  listCategory: [],
  listCategoryFilter: [],
  keyword : null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case Types.GET_LIST_CATEGORY_SUCCESS: {
      const listCategory = action.payload.data.data.data;
      return {
        ...state,
        listCategory,
      };
    }
    case Types.CREATE_CATEGORY_SUCCESS: {
      const category = action.payload.data.data.data;
      console.log(category);
      return {
        ...state,
        category,
      };
    }
    case Types.GET_CATEGORY_SUCCESS: {
      const account = action.payload.id.data.data;
      return {
        ...state,
        account,
      };
    }
    case Types.DISABLE_CATEGORY_SUCCESS: {
      const account = action.payload.data.data;
      return {
        ...state,
        account,
      };
    }
    case Types.FILTER_CATEGORY_SUCCESS: {
      const keyword = action.payload.data.keyword;
      let newList = [];
      if (keyword === "") {
        newList = state.listCategory;
      } else {
        newList = state.listCategory.filter((o) =>
          (
            o.categoryName.toLowerCase().replace(/\s/g, "")
          ).includes(keyword.toLowerCase().replace(/\s/g, ""))
        );
      }
      return {
        ...state,
        listCategoryFilter: newList,
        keyword : keyword
      };
    }
    default:
      return state;
  }
};
