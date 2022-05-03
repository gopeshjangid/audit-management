import * as actionType from "../constants/constant.action";

export const getAuditReportBySearch = (payload) => ({
  type: actionType.GET_AUDIT_REPORT_REQUEST,
  payload,
});


export const clearSearchReportDetails = () => ({
  type: actionType.CLEAR_AUDIT_REPORT_DETAILS
});

export const clearAllReportsData = () => ({
  type: actionType.CLEAR_REDUCER,
});

