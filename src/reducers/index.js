import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import getClaims from './reducer.getClaims';
import loginReducer from './reducer.login';
import masterReducer from './reducer.masterTable';
import report from './reducer.reports';

const app = combineReducers({
  getClaims,
  report,
  form: reduxFormReducer,
  login: loginReducer,
  masterTable: masterReducer,
});

export default app;
