import * as actionType from "../constants/constant.action";

export const getClaimsBySearch = (payload) => ({
  type: actionType.GET_CLAIMS_REQUESTED,
  payload,
});

export const clearSelectedClaim = () => ({
  type: actionType.CLEAR_SELECTED_CLAIM
});

export const clearReducer = () => ({
  type: actionType.CLEAR_REDUCER,
});

export const getClaimDetail= (payload) => ({
  type: actionType.GET_CLAIM_DETAIL,
  claimNumber: payload,
});

export const saveActionData = (data) => ({
  type: actionType.SAVE_ACTION_DATA,
  payload : data
})

export const saveClaimCategories = (data) => ({
  type: actionType.SAVE_CLAIM_CATEGORIES,
  payload: data
});


export const getSelectedClaimByClaims = (data) => ({
  type: actionType.SELECT_CLAIM_BY_CLAIMS,
  payload: data
})

export const getClaimsByAssignee = (data) => ({
  type: actionType.GET_ASSIGNEE_CLAIMS_REQUESTED,
  payload: data
})



export const clearAllClaims = (payload) => ({
  type: actionType.CLEAR_ALL_CLAIMS,
  payload
});

export const updateErrorMessage = (payload) => ({
  type: actionType.UPDATE_ERROR_MESSAGE,
  payload
});


