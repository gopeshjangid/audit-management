import React, { Component } from 'react'
import { Auth, Cache } from 'aws-amplify';
import Logo from './../../assets/images/centivo-logo-new.svg';
import { connect } from 'react-redux';
import { getLoginSuccess, getLoginRequest, getLoginFailure } from '../../actions';
import './style/style.scss';
import LoginForm from './../../components/loginForm';
// require('./../../config/config.amplify');

class Admin extends Component {
  getUserInfo = user => {
    sessionStorage.setItem('isLoggedIn', false);
    Cache.clear();
    Auth.currentSession()
      .then(data => {
        let param =
          'access_token=' +
          data.accessToken.jwtToken +
          '&id_token=' +
          data.idToken.jwtToken;
        sessionStorage.setItem('param', param);
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('userSignedIn', true);
        this.props.history.push('/claims#' + param);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { getLoginSuccess, getLoginRequest, getLoginFailure, login } = this.props
    return (
      <div className="login-container">
        <LoginForm
          getUserInfo={this.getUserInfo}
          getLoginSuccess={getLoginSuccess}
          getLoginRequest={getLoginRequest}
          getLoginFailure={getLoginFailure}
          authFailed={login.errMsg} />

        {/* {
          login.fetching && <Loader />
        } */}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getLoginSuccess: (obj) => dispatch(getLoginSuccess(obj)),
  getLoginRequest: () => dispatch(getLoginRequest()),
  getLoginFailure: (errObj) => dispatch(getLoginFailure(errObj))
})

const mapStateToProps = state => ({
  login: state.login
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)