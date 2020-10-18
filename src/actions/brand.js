import * as Types from "../constants/ActionTypes";

export const getListBrand = () => {
    return {
        type : Types.GET_LIST_BRAND,
    }
}

export const getListBrandSuccess = (data) => {
    return {
        type : Types.GET_LIST_BRAND_SUCCESS,
        payload:{
            data
        }
    }
}

export const createBrandRequest = (data) => {
    return {
        type : Types.CREATE_BRAND,
        payload:{
            data
        }
    }
}

export const createBrandSuccess = (data) => {
    return {
        type : Types.CREATE_BRAND_SUCCESS,
        payload:{
            data
        }
    }
}

export const getBrandRequest = (id) => {
    return {
        type : Types.GET_BRAND,
        payload:{
            id
        }
    }
}

export const getBrandSuccess = (id) => {
    return {
        type : Types.GET_BRAND_SUCCESS,
        payload:{
            id
        }
    }
}

export const updateBrandRequest = (data) => {
    return {
        type : Types.UPDATE_BRAND,
        payload:{
            data
        }
    }
}

export const updateBrandSuccess = (data) => {
    return {
        type : Types.UPDATE_BRAND_SUCCESS,
        payload:{
            data
        }
    }
}


export const disableBrandRequest = (data) => {
    return {
        type : Types.DISABLE_BRAND,
        payload:{
            data
        }
    }
}

export const disableBrandSuccess = (data) => {
    return {
        type : Types.DISABLE_BRAND_SUCCESS,
        payload:{
            data
        }
    }
}

export const filterBrandRequest = (keyword) => {
    return {
        type : Types.FILTER_BRAND,
        payload:{
            keyword
        }
    }
}

export const filterBrandSuccess = (data) => {
    return {
        type : Types.FILTER_BRAND_SUCCESS,
        payload:{
            data
        }
    }
}