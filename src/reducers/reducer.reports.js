import * as actionType from "../constants/constant.action";
import momentTz from "moment-timezone";
import { EST_TIMEZONE } from "../constants/constant.app";
const defaultState = {
  searchField: {
    groupName: "",
    examinerName: "",
    claimProcessStartDate: "05/24/2021",//moment(new Date()).format("MM/DD/YYYY"),
    claimProcessEndDate: momentTz().tz(EST_TIMEZONE).format("MM/DD/YYYY"),
    claimType: "",
    claimStatus: "",
    greaterThanDollarAmount: "",
    auditor: ""
  },
  loading: false,
  report:[],
  searchError: ""
};

const reports = (state = defaultState, action) => {
  switch (action.type) {
    case actionType.GET_AUDIT_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_AUDIT_REPORT_SUCCESS:
      if ( action.payload.result.length === 0 || (action.payload.result.length === 1 && action.payload.result[0]?.Result)) {
        return {
          ...state,
          report:[],
          searchField: action?.payload?.searchField || [],
          searchError: "Data not found for given search criteria",
          loading: false,
        };
      }

      return {
        ...state,
        report: action.payload.result,
        searchField: action?.payload?.searchField || {},
        searchError: "",
        loading: false,
      };
    case actionType.CLEAR_REDUCER:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};

export default reports;
