import * as actionType from '../constants/constant.action';

const defaultState = {
    fetching: false,
    userLoggedIn: false,
    email : '',
    userName : null,
    userType : null
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    case actionType.GET_LOGIN_REQUEST:
      return {
        ...state,
        userLoggedIn:true,
        fetching: true,
        errMsg:''
      };

    case actionType.GET_LOGIN_SUCCESS:
      localStorage.setItem('login',action.payload.login.username);
      const {
        login : {
          signInUserSession : {
            idToken : {
              jwtToken
            }
          }
        }
      } = action.payload;
      localStorage.setItem('idToken',jwtToken)

      return {
        ...state,
        fetching: false,
        userLoggedIn:true,
        login: action.payload
      };

    case actionType.GET_LOGIN_FAILURE:
      return {
        ...state,
        fetching:false,
        userLoggedIn:true,
        errMsg:action.payload.message
      }

    case actionType.USER_LOGOUT_REQUEST:
      return{
        ...state,
        userLoggedIn:true,
      }  
    default:
      return state;
  }
};

export default loginReducer;
