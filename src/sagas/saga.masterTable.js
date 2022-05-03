import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_SUBCAT ,ADD_SUBCAT_START, UPDATE_SUB_CAT, GET_CATEGORIES_SUBCATEGORIES, UPDATE_CATEGORIES_SUBCATEGORIES, FAIL_CATEGORIES_SUBCATEGORIES, UPDATE_SUBCAT_START, DELETE_START_CAT, DELETE_SUBCAT_SUCCESS } from "../constants";
import { api } from "../services";

function* getCategoriesSubCategories(action) {
  try {
    const result = yield call(api.getCategoriesSubCategories, action.payload);
    if (result.data && result.status === 200) {
      yield put({
        type: UPDATE_CATEGORIES_SUBCATEGORIES,
        payload: { result: result.data },
      });
    } else {
      yield put({
        type: FAIL_CATEGORIES_SUBCATEGORIES,
        payload: result.response.data.error.message,
      });
    }
  } catch (error) {
    yield put({ type: FAIL_CATEGORIES_SUBCATEGORIES, error });
  }
}

function* updateCatSubCat(action){
  try {
    const result = yield call(api.updateAddSubCat, {
      subCategoryId : action.payload.subCategoryId,
      subCategory : action.payload.subCategory,
      errorType : action.payload.errorType

    });
    if (result.data && result.status === 200) {
      yield put({
        type: UPDATE_SUB_CAT,
        payload: { subCategoryId :  action.payload.subCategoryId ,subCategory : action.payload.subCategory ,errorType : action.payload.errorType }
      });
    } else {
      yield put({
        type: FAIL_CATEGORIES_SUBCATEGORIES,
        payload: result.response.data.error.message,
      });
    }
  } catch (error) {
    yield put({ type: FAIL_CATEGORIES_SUBCATEGORIES, error });
  }
}

function* addCatSubCat(action){
  try {
    const result = yield call(api.addSubCat, {category : action.payload.category , subCategory  :action.payload.subCategory ,errorType : action.payload.errorType});
    if (result.data && result.status === 200) {
      yield put({
        type: ADD_SUBCAT,
        payload: { ...action.payload ,subCategoryId :  result.data.subCategoryId },
        flag: action.flag
      });
    } else {
      yield put({
        type: FAIL_CATEGORIES_SUBCATEGORIES,
        payload: result.response.data.error.message,
      });
    }
  } catch (error) {
    yield put({ type: FAIL_CATEGORIES_SUBCATEGORIES, error });
  }
}

function* deleteCatSubCat(action){
  try {
    const result = yield call(api.deleteSubCategory, action.payload);
    if (result.data && result.status === 200) {
      yield put({
        type: DELETE_SUBCAT_SUCCESS,
        payload: { subCategoryId : action.payload.subCategoryId },
        flag: action.flag
      });
    } else {
      yield put({
        type: FAIL_CATEGORIES_SUBCATEGORIES,
        payload: result.response.data.error.message,
      });
    }
  } catch (error) {
    yield put({ type: FAIL_CATEGORIES_SUBCATEGORIES, error });
  }
}

export function* getMasterTablehWatcherSaga() {
  yield takeLatest(GET_CATEGORIES_SUBCATEGORIES, getCategoriesSubCategories);
  yield takeLatest(UPDATE_SUBCAT_START, updateCatSubCat)
  yield takeLatest(ADD_SUBCAT_START, addCatSubCat)
  yield takeLatest(DELETE_START_CAT, deleteCatSubCat)
  
}
