import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_CLAIMS_REQUESTED,
  GET_CLAIMS_SUCCESS,
  GET_CLAIMS_FAILURE,
  SAVE_ACTION_DATA,
  UPDATE_SELECTED_CLAIM,
  UPDATE_FAIL_CLIAM,
  GET_CLAIM_DETAIL,
  UPDATE_CLAIM_DETAIL,
  SAVE_CLAIM_CATEGORIES,
  UPDATE_CLAIM_CATEGORY,
  GET_ASSIGNEE_CLAIMS_REQUESTED,
  GET_CLAIMS_SUCCESS_BY_FILTER
} from "../constants";

import { api } from "../services";

function* getClaimsSearchResult(action) {
  try {
    const result = yield call(api.getClaimsSearchApi, action.payload);
    if (result.data && result.status === 200) {
      yield put({
        type: GET_CLAIMS_SUCCESS,
        payload: { result: result.data, searchField: action.payload },
      });
    } else {
      yield put({
        type: GET_CLAIMS_FAILURE,
        payload: result.response.status === 400   ? 'Oops ! something went wrong. Please try again.' : result.response?.data?.message,
      });
    }
  } catch (error) {
    yield put({ type: GET_CLAIMS_FAILURE, payload : error.message });
  }
}

function getApiUrl  (type) {
  switch (type) {
    case 'ASSIGNEE':
     return api.getClaimsByAssignee;
    case 'OPEN':
     return api.getClaimsByOpenStatus;
    case 'IN-PROGRESS':
    case 'IN-REVIEW':
     return api.getClaimsByOpenStatus;
    default:
      return '';
  }
}

function getFormattedData  (type, data) {
  switch (type) {
    case 'ASSIGNEE':
     return api.getClaimsByAssignee;
    case 'OPEN':
     return  { claims: data ,openClaimsCount : data.length };
     case 'IN-REVIEW':
     return  { claims: data ,pendingClaimsCount : data.length };
    case 'IN-PROGRESS':
     return  { claims: data ,inProgressClaimsCount : data.length };
    default:
      return '';
  }
}

function* getClaimsByFilters(action) {
  try {
    let apiFunction = getApiUrl(action.payload.type);
    const result = yield call(apiFunction, action.payload.data);
    if (result.data && result.status === 200) {
      let data = action.payload.type !=='ASSIGNEE' ? getFormattedData(action.payload.type, result.data) :  { claims: result.data?.assignedClaims || [], ...result.data }
      yield put({
        type: GET_CLAIMS_SUCCESS_BY_FILTER,
        payload: data,
      });
    } else {
      yield put({
        type: GET_CLAIMS_FAILURE,
        payload: result.response.status === 400   ? 'Oops ! something went wrong. Please try again.' : result.response.data?.message,
      });
    }
  } catch (error) {
    yield put({ type: GET_CLAIMS_FAILURE, payload : error.message });
  }
}

function* updateSelectedClaim(action){
  const result = yield call(api.updateClaimActionApi, action.payload);
  if (result.data && result.status === 200) {
    yield put({
      type: GET_CLAIM_DETAIL,
      claimNumber: action?.payload?.claimNumber
    });

    yield put({
      type: UPDATE_SELECTED_CLAIM,
      payload: { result: action.payload },
    });
  } else {
    yield put({
      type: UPDATE_FAIL_CLIAM,
      payload: result.response.data.error,
    });
  }
}

function* getClaimDetail(action) {

  const result = yield call(api.getClaimDetailApi, { claimNumber: action.claimNumber})
  if (result.data && result.status === 200) {
    yield put({
      type: UPDATE_CLAIM_DETAIL,
      payload: { result: result.data},
    });
  } else {
    yield put({
      type: UPDATE_FAIL_CLIAM,
      payload: result.response.data.error.message,
    });
  }
}

function* updateClaimCategories(action){
  const result = yield call(api.updateClaimCategories, action.payload);
  if (result.data && result.status === 200) {
    yield put({
      type: UPDATE_CLAIM_CATEGORY,
      payload: { result: action.payload},
    });
  } else {
    yield put({
      type: UPDATE_FAIL_CLIAM,
      payload: result.response.data.error.message,
    });
  }
} 

export function* claimSearchWatcherSaga() {
  yield takeLatest(GET_CLAIMS_REQUESTED, getClaimsSearchResult);
  yield takeLatest(SAVE_ACTION_DATA, updateSelectedClaim);
  yield takeLatest(GET_CLAIM_DETAIL, getClaimDetail);
  yield takeLatest(SAVE_CLAIM_CATEGORIES, updateClaimCategories);
  yield takeLatest(GET_ASSIGNEE_CLAIMS_REQUESTED, getClaimsByFilters);
}
