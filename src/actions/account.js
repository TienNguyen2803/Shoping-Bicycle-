import * as Types from "../constants/ActionTypes";

export const getListAccount = () => {
    return {
        type : Types.GET_LIST_ACCOUNT,
    }
}

export const getListAccountSuccess = (data) => {
    return {
        type : Types.GET_LIST_ACCOUNT_SUCCESS,
        payload:{
            data
        }
    }
}

export const createAccountRequest = (data) => {
    return {
        type : Types.CREATE_ACCOUNT,
        payload:{
            data
        }
    }
}

export const createAccountSuccess = (data) => {
    return {
        type : Types.CREATE_ACCOUNT_SUCCESS,
        payload:{
            data
        }
    }
}

export const getAccountRequest = (id) => {
    return {
        type : Types.GET_ACCOUNT,
        payload:{
            id
        }
    }
}

export const getAccountSuccess = (id) => {
    return {
        type : Types.GET_ACCOUNT_SUCCESS,
        payload:{
            id
        }
    }
}

export const updateAccountRequest = (data) => {
    return {
        type : Types.UPDATE_ACCOUNT,
        payload:{
            data
        }
    }
}

export const updateAccountSuccess = (data) => {
    return {
        type : Types.UPDATE_ACCOUNT_SUCCESS,
        payload:{
            data
        }
    }
}


export const disableAccountRequest = (data) => {
    return {
        type : Types.DISABLE_ACCOUNT,
        payload:{
            data
        }
    }
}

export const disableAccountSuccess = (data) => {
    return {
        type : Types.DISABLE_ACCOUNT_SUCCESS,
        payload:{
            data
        }
    }
}

export const filterAccountRequest = (keyword) => {
    return {
        type : Types.FILTER_ACCOUNT,
        payload:{
            keyword
        }
    }
}

export const filterAccountSuccess = (data) => {
    return {
        type : Types.FILTER_ACCOUNT_SUCCESS,
        payload:{
            data
        }
    }
}