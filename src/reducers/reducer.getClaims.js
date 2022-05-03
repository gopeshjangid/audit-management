import * as actionType from "../constants/constant.action";
import momentTz from "moment-timezone";
import { EST_TIMEZONE } from "../constants/constant.app";
const defaultState = {
  searchField: {
    auditor: "",
    auditStatus: "OPEN",
    groupName: "",
    examinerName: "",
    claimProcessStartDate: momentTz()
      .tz(EST_TIMEZONE)
      .subtract(1, "days")
      .format("MM/DD/YYYY"),
    claimProcessEndDate: momentTz().tz(EST_TIMEZONE).format("MM/DD/YYYY"),
    claimType: "",
    claimStatus: "",
    greaterThanDollarAmount: "",
    assignee: "",
  },
  loading: false,
  claims: [],
  pendingClaimsCount: 0,
  openClaimsCount: 0,
  inProgressClaimsCount: 0,
  assignedToCurrentUserCount: 0,
  inReviewCount: 0,
  selectedClaims: {"claimNumber":"221-0000063524-01","auditStatus":"IN-PROGRESS","auditType":"RANDOM","claimType":"1","examinerName":"Julia Feng","groupName":"CONE1","claimStatus":"PAID","claimProcessDate":"2021-08-02","totalCharge":"-210.00","totalPayment":"0.00","errorType":null,"categories":null,"financialAccuracy":null,"monetaryValue":null,"actions":[{"notes":null,"assignee":"Claim Test User","isAgree":null,"timestamp":"1631020037471","status":"IN-PROGRESS","user":"Claim Test User","userRole":"AUDITOR","emailSentToAssignee":null}],"lastLoggedInUser":"Claim Test User","lastLoggedInUserRole":"AUDITOR","lastUpdateTimeStamp":1631020037471,"auditor":"Claim Test User","totalErrors":null,"isAgree":null,"assignee":"Claim Test User","paymentType":null,"monetoryValue":null,"detailedCategories":[],"history":[{"userName":"Claim Test User","type":"assignee","dateTime":1630672808653,"from":null,"to":"Claim Test User","userRole":"AUDITOR","userImage":null},{"userName":"Claim Test User","type":"auditStatus","dateTime":1630672808653,"from":"OPEN","to":"IN-PROGRESS","userRole":"AUDITOR","userImage":null}],"reviewStartDate":null,"reviewCompleteDate":null,"auditStartDate":"2021-09-07","auditEndDate":null},
  actions: [],
  searchAction: false,
  errorMessage: "",
};

const getClaims = (state = defaultState, action) => {
  switch (action.type) {
    case actionType.GET_CLAIMS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_CLAIM_DETAIL:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_ASSIGNEE_CLAIMS_REQUESTED:
      return {
        ...state,
        loading: true,
        searchAction: true,
      };

    case actionType.GET_CLAIMS_FAILURE:
      return {
        ...state,
        loading: false,
        searchAction: true,
        errorMessage: action.payload,
      };

    case actionType.CLEAR_SELECTED_CLAIM:
      return {
        ...state,
        selectedClaims: null,
      };
  case actionType.SAVE_ACTION_DATA:
    return {
      ...state,
      loading : true,
    };  
    case actionType.SAVE_CLAIM_CATEGORIES:
      return {
        ...state,
        loading: true,
      };

    case actionType.UPDATE_CLAIM_DETAIL:
      return {
        ...state,
        loading: false,
        selectedClaims: action.payload.result,
      };
    case actionType.SELECT_CLAIM_BY_CLAIMS:
      return {
        ...state,
        selectedClaims: {
          ...action.payload,
          paymentType: null,
          categories: [],
          actions: [],
          errorType: "NO_ERROR",
          detailedCategories: [],
        },
      };
    case actionType.SELECT_CLAIM:
      return {
        ...state,
        selectedClaims: {
          ...action.payload,
        },
      };
    case actionType.GET_CLAIMS_SUCCESS_BY_FILTER:
      return {
        ...state,
        ...action.payload,
        searchAction: true,
        loading: false,
        errorMessage: "",
      };

    case actionType.GET_CLAIMS_SUCCESS:
      if (
        action.payload.result.length === 0 ||
        (action.payload.result.length === 1 && action.payload.result[0]?.Result)
      ) {
        return {
          ...state,
          claims: [],
          searchField: action?.payload?.searchField || [],
          searchError: "Claims not found for given search criteria",
          loading: false,
          searchAction: true,
          errorMessage: "",
        };
      }

      return {
        ...state,
        claims: action.payload.result,
        searchField: action?.payload?.searchField || {},
        searchError: "",
        loading: false,
        errorMessage: "",
      };
    case actionType.CLEAR_REDUCER:
      return {
        ...defaultState,
      };
    case actionType.CLEAR_ALL_CLAIMS:
      return {
        ...state,
        claims: [],
        searchAction: false,
        errorMessage: "",
      };
    case actionType.UPDATE_CLAIM_CATEGORY:
      const claimData = action.payload.result;
      const updatedClaimsData = state.claims.map((val) => {
        if (val.claimNumber === claimData.claimNumber) {
          val = {
            ...val,
            ...claimData,
          };
        }
        return val;
      });
      return {
        ...state,
        selectedClaims: {
          ...state.selectedClaims,
          ...claimData,
        },
        claims: updatedClaimsData,
        loading: false,
      };
    case actionType.UPDATE_SELECTED_CLAIM:
      const data = action.payload.result;
      const newAction = {
        notes: data.notes,
        assignee: data.assignee || "",
        isAgree: data?.isAgree ?? null,
        timestamp: Date.now(),
        status: data.status,
        user: data.user || localStorage.getItem("login"),
        userRole: data.userType || localStorage.getItem("userType"),
      };
      const updatedData = {
        claimNumber: data?.claimNumber,
        isAgree: data?.isAgree ?? state.selectedClaims?.isAgree,
        assignee: data?.assignee ?? state.selectedClaims?.assignee,
        auditStatus: data?.status ?? state.selectedClaims?.auditStatus,
        paymentType: data?.paymentType ?? state.selectedClaims?.paymentType,
        monetoryValue: data?.monetoryValue ?? state.selectedClaims?.monetoryValue,
        monetaryValue: data?.monetoryValue ?? state.selectedClaims?.monetoryValue,
        financialAccuracy: data?.financialAccuracy ?? state.selectedClaims?.financialAccuracy,
        errorType: data?.errorType ?? state.selectedClaims?.errorType,
      };

      return {
        ...state,
        selectedClaims: {
          ...state.selectedClaims,
          ...updatedData,
          actions: [newAction, ...state.selectedClaims.actions],
        },
        loading : false
      };

    case actionType.UPDATE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage : ''
      };  
    default:
      return state;
  }
};

export default getClaims;
