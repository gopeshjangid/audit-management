import { all } from "redux-saga/effects";
import {
    claimSearchWatcherSaga
} from "./saga.getClaims";
import {
  getMasterTablehWatcherSaga,
} from "./saga.masterTable";
import {
  auditReportWatcherSaga,
}from "./saga.reports"

export default function* rootSaga() {
  yield all([
    claimSearchWatcherSaga(),
    getMasterTablehWatcherSaga(),
    auditReportWatcherSaga(),
  ]);
}
