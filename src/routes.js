import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Admin } from './containers/admin';
import Amplify from 'aws-amplify';

import GetClaim  from './containers/getClaims';
import ClaimDetail from './containers/claimDetail';
import GetCategories from './containers/categories';
import Signup from './containers/signUp';
import ForgotPassword from './containers/forgotPassword';
import Header from './components/header';
import PrivateRoute from './utils/PrivateRoute';
import Reports from './containers/reports';

const routes = (
    <div>
        <Header />
        <Switch>
            <Route exact path="/" component={Admin} />
            <Route exact path="/admin" component={Admin} />
            <PrivateRoute exact path="/claims" component={GetClaim} />
            <Route exact path="/claim-detail" component={ClaimDetail} />
            <PrivateRoute exact path="/reports" component={Reports} />
            <PrivateRoute exact path="/category" component={GetCategories} />
            <Route exact path="/signUp" component={Signup} />
            <Route exact path="/forgetPassword" component={ForgotPassword} />
        </Switch>
    </div>
)
Amplify.configure({
    Auth: {
      //identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
      region: process.env.REACT_APP_REGION,
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      oauth: {
        domain: process.env.REACT_APP_DOMAIN,
        scope: [
          'phone',
          'email',
          'profile',
          'openid',
          'aws.cognito.signin.user.admin'
        ],
        redirectSignIn: process.env.REACT_APP_REDIRECT_SIGNIN,
        redirectSignOut: process.env.REACT_APP_REDIRECT_SIGNOUT,
        responseType: 'token',

        options: {
          AdvancedSecurityDataCollectionFlag: true,
          popup: true
        }
      }
    }
  });

export default routes