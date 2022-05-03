import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_AUDIT_REPORT_REQUEST,
  GET_AUDIT_REPORT_SUCCESS,
  GET_AUDIT_REPORT_FAILURE,
} from "../constants";

import { api } from "../services";

function* getAuditReportResult(action) {
  try {
    const result = yield call(api.auditReport, action.payload);
    if (result.data && result.status === 200) {
      yield put({
        type: GET_AUDIT_REPORT_SUCCESS,
        payload: { result: result.data, searchField: action.payload },
      });
    } else {
      yield put({
        type: GET_AUDIT_REPORT_FAILURE,
        payload: result.response.data.error.message,
      });
    }
  } catch (error) {
    yield put({ type: GET_AUDIT_REPORT_FAILURE, error });
  }
}



export function* auditReportWatcherSaga() {
  yield takeLatest(GET_AUDIT_REPORT_REQUEST, getAuditReportResult);
}
