import * as Types from "constants/ActionTypes";

const INIT_STATE = {
  account: {},
  listAccount: [],
  listAccountFilter: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case Types.GET_LIST_ACCOUNT_SUCCESS: {
      const listAccount = action.payload.data.data.data;
      return {
        ...state,
        listAccount,
      };
    }
    case Types.CREATE_ACCOUNT_SUCCESS: {
      const account = action.payload.data.data.data;
      return {
        ...state,
        account,
      };
    }
    case Types.GET_ACCOUNT_SUCCESS: {
      const account = action.payload.id.data.data;
      return {
        ...state,
        account,
      };
    }
    case Types.DISABLE_ACCOUNT_SUCCESS: {
      const account = action.payload.data.data;
      return {
        ...state,
        account,
      };
    }
    case Types.FILTER_ACCOUNT_SUCCESS: {
      const keyword = action.payload.data.keyword;
      let newList = [];
      if (keyword === "") {
        newList = state.listAccount;
      } else {
        newList = state.listAccount.filter((o) =>
          (
            o.firstname.toLowerCase().replace(/\s/g, "") +
            o.lastname.toLowerCase().replace(/\s/g, "")
          ).includes(keyword.toLowerCase().replace(/\s/g, ""))
        );
      }
      return {
        ...state,
        listAccountFilter: newList,
      };
    }
    default:
      return state;
  }
};
