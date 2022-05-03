import axios from 'axios';
import { validCodes } from '../constants';
import { token } from '../services';
export const baseService = {
  get,
  put,
  post,
  delete: _delete
};
const API_KEY =  process.env.REACT_APP_KEY;

export const methodType = {
  get: 'GET',
  put: 'PUT',
  post: 'POST',
  delete: 'DELETE'
};

const getHeader = (header) => {
  let idToken = localStorage.getItem('idToken');

  return  {
    Authorization:header ? `Bearer ${header}` : "",
    "x-api-key": API_KEY,
    "Authorization" : "Bearer "+idToken
  };
}

//===========CRUD Operations=====================//

//Get Call
function get(url, header ,hideHeaders) {

  const headers =  getHeader(header);

  return axios
    .get(url, {
      headers:headers
    })
    .then(handleResponse)
    .catch(error);
}


//create Call
function put(url, header, body) {
  const headers =  getHeader(header);

  return axios
    .put(url, body, { headers: headers })
    .then(handleResponse)
    .catch(error);
}
//update Call
function post(url, header, body) {
  const headers =  getHeader(header);
  if (header) {
    return axios
      .post(url, body, { headers: headers })
      .then(handleResponse)
      .catch(error);
  }
  return axios
    .post(url, body, { headers:headers})
    .then(handleResponse)
    .catch(error);
}

// Delete Call (prefixed function name with underscore because delete is a reserved word in javascript)
function _delete(url, header, body) {
  const headers =  getHeader(header);

  return axios
    .delete(url, {
      headers: headers,
      data : body
    })
    .then(handleResponse)
    .catch(error);
}

//callback of response (returns promise)
function handleResponse(response) {
  if (!validCodes(response.status)) {
    return Promise.reject(response);
  }
  response &&
    response.data &&
    response.data.sessionToken &&
    token.setToken(response.data.sessionToken);
  return response;
}

//callback of error
function error(error) {
  return error;
}
