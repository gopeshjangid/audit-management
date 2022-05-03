import * as actionType from "../constants/constant.action";

export const getCategoriesSubCategories = () => ({
    type: actionType.GET_CATEGORIES_SUBCATEGORIES
});

export const updateExaminerAuditorName = (payload) => ({
    type: actionType.UPDATE_EXAMINER_AUDITOR_NAME,
    payload
});

export const addSubCat = (payload, flag) => ({
    type: actionType.ADD_SUBCAT_START,
    payload,
    flag
});

export const updateSubCat = (payload, flag) => ({
    type: actionType.UPDATE_SUBCAT_START,
    payload,
    flag
});

export const deleteSubCategory = (payload) => ({
    type: actionType.DELETE_START_CAT,
    payload
});

export const clearMasterTableReducer = () => ({
    type: actionType.CLEAR_MASTER_REDUCER
})
