/**
 * Summary: Member Search actions
 * Description: Member Search function which will called to service layer
 * @author Prateek Jain
 * @date  09.10.2018
 */
import { baseService } from '../services';
import { uriConstants } from '../constants/constant.uri';
import { converApiObjectToQuesryString } from "../helpers/utility";

const BASE_URL = process.env.NODE_ENV === 'development' ?   '' : process.env.REACT_APP_API_HOST;
/**
 * Description: const member list would be exposed so it can be accessed outside
 * @param {null}
 * @return {null}
 */
export const serviceAPI = {
  getClaimsSearchApi,
  createNewUser,
  resetpassword,
  sendAccessCode,
  verifyaccesscode,
  getConcurrentClaimsState,
  getClaimDetailApi,
  updateClaimActionApi,
  verifyUserEmail,
  getCategoriesSubCategories,
  getConfigApi,
  updateClaimCategories,
  auditReport,
  updateAddSubCat,
  deleteSubCategory,
  addSubCat,
  getClaimsByAssignee,
  getClaimsByOpenStatus
};

/**
 * Description: Fetch list of members on the basis of filter
 * @param {json} req_data
 * @return {json} req_response
 */

function getClaimsSearchApi(requestData) {
  const url = BASE_URL+uriConstants.CLAIM_SEARCH_URL+converApiObjectToQuesryString(requestData);
  return baseService.get(url, '');
}

function createNewUser(requestData) {
  const url = BASE_URL+uriConstants.CREATE_USER_URL;
  return baseService.post(url, '',requestData);
}

function sendAccessCode(requestData) {
  const url = BASE_URL+uriConstants.SEND_CODE;
  return baseService.put(url, '',requestData);
}


function verifyaccesscode (requestData) {
  const url = BASE_URL+uriConstants.VERIFY_CODE;
  return baseService.post(url, '',requestData);
}

function resetpassword (requestData) {
  const url = BASE_URL+uriConstants.RESET_PWD;
  return baseService.post(url, '',requestData);
}

function getConcurrentClaimsState (requestData) {
  const url = BASE_URL+uriConstants.GET_CURRENT_CLAIM_STATUS;
  return baseService.post(url, '',requestData);
}


function getClaimDetailApi(requestData) {
  const url = BASE_URL+uriConstants.CLAIM_DETAIL+converApiObjectToQuesryString(requestData);
  return baseService.get(url, '');
}

function verifyUserEmail(requestData) {
  const url = BASE_URL+uriConstants.VERIFY_USER_EMAIL;
  return baseService.post(url, '',requestData);
}

function getCategoriesSubCategories() {
  const url = BASE_URL+uriConstants.GET_CATEGORIES_SUBCATEGORIES;
  return baseService.get(url, '');
}
function getConfigApi() {
  const username = localStorage.getItem("login");
  let url = BASE_URL+uriConstants.GET_CONFIG+"?userName="+username;
  return baseService.get(url, '' ,true);
}

function updateClaimCategories(requestData) {
  const url = BASE_URL+uriConstants.UPDATE_CLAIM_CATEGORIES;
  return baseService.post(url, '',requestData);
}

function auditReport(requestData) {
  const url = BASE_URL+uriConstants.GET_AUDIT_CLAIM_REPORT+converApiObjectToQuesryString(requestData);
  return baseService.get(url, '');
}

function updateAddSubCat(requestData) {
  const url = BASE_URL+uriConstants.UPDATE_MASTER_SUBCAT;
  return baseService.put(url, '', requestData);
}

function addSubCat(requestData) {
  const url = BASE_URL+uriConstants.ADD_UPDATE_SUBCAT;
  return baseService.post(url, '', requestData);
}

function deleteSubCategory(requestData) {
  const url = BASE_URL+uriConstants.DELETE_MASTER_SUBCAT;
  return baseService.delete(url, '', requestData);
}

function updateClaimActionApi(requestData) {
  const url=  BASE_URL+uriConstants.CLAIM_ACTION;
  return baseService.put(url, '', requestData);
}

function getClaimsByAssignee(requestData) {
  const url=  BASE_URL+uriConstants.GET_CLAIMS_BY_ASSIGNEE+"?assignee="+requestData;
  return baseService.get(url, '');
}

function getClaimsByOpenStatus(requestData) {
  const url=  BASE_URL+uriConstants.GET_CLAIMS_BY_STATUS+"?auditStatus="+requestData;
  return baseService.get(url, '');
}

