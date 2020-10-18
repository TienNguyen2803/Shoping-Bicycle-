import * as Types from "../constants/ActionTypes";

export const getListCategory = () => {
    return {
        type : Types.GET_LIST_CATEGORY,
    }
}

export const getListCategorySuccess = (data) => {
    return {
        type : Types.GET_LIST_CATEGORY_SUCCESS,
        payload:{
            data
        }
    }
}

export const createCategoryRequest = (data) => {
    return {
        type : Types.CREATE_CATEGORY,
        payload:{
            data
        }
    }
}

export const createCategorySuccess = (data) => {
    return {
        type : Types.CREATE_CATEGORY_SUCCESS,
        payload:{
            data
        }
    }
}

export const getCategoryRequest = (id) => {
    return {
        type : Types.GET_CATEGORY,
        payload:{
            id
        }
    }
}

export const getCategorySuccess = (id) => {
    return {
        type : Types.GET_CATEGORY_SUCCESS,
        payload:{
            id
        }
    }
}

export const updateCategoryRequest = (data) => {
    return {
        type : Types.UPDATE_CATEGORY,
        payload:{
            data
        }
    }
}

export const updateCategorySuccess = (data) => {
    return {
        type : Types.UPDATE_CATEGORY_SUCCESS,
        payload:{
            data
        }
    }
}


export const disableCategoryRequest = (data) => {
    return {
        type : Types.DISABLE_CATEGORY,
        payload:{
            data
        }
    }
}

export const disableCategorySuccess = (data) => {
    return {
        type : Types.DISABLE_CATEGORY_SUCCESS,
        payload:{
            data
        }
    }
}

export const filterCategoryRequest = (keyword) => {
    return {
        type : Types.FILTER_CATEGORY,
        payload:{
            keyword
        }
    }
}

export const filterCategorySuccess = (data) => {
    return {
        type : Types.FILTER_CATEGORY_SUCCESS,
        payload:{
            data
        }
    }
}