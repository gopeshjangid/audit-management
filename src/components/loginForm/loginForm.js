import React from "react";
import  {withRouter, Link} from "react-router-dom";
import { Field, reduxForm } from "redux-form";
// import { Form, Button, FormGroup, Row, Col, InputGroup  ,Spinner} from "reactstrap";
// import { renderTextField } from "./../wrapper";
import { _global } from "./../../helpers";
import { Auth } from "aws-amplify";
import { keyConstants } from "./../../constants";
import "./styles/login.scss";
import { withOAuth } from 'aws-amplify-react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loader :  false
    };
    this.config = Auth.configure();
    sessionStorage.removeItem("sessionTimeOut");
    sessionStorage.removeItem("_sessionToken");
    sessionStorage.removeItem("param");
  }

  redirectUrl = '';


  componentDidMount() {
    this.handleLogin();
  }

  handleLogin = () => {
    const { domain, redirectSignIn, responseType } = this.config.oauth;
    const clientId = this.config.userPoolWebClientId;
    sessionStorage.setItem('loginClient', 'azure');
    const url =
      'https://' +
      domain +
      '/login?redirect_uri=' +
      redirectSignIn +
      '&response_type=' +
      responseType +
      '&client_id=' +
      clientId;
    // sessionStorage.setItem('isLoggedIn', true);
    // sessionStorage.setItem('userSignedIn', true);
    //this.redirectUrl = url;
     window.location.assign(url);

  };

  handleLogout = () => {
    const config = Auth.configure();
    const { domain, redirectSignOut } = config.oauth;
    const clientId = config.userPoolWebClientId;
    const url =
      'https://' +
      domain +
      '/logout?logout_uri=' +
      redirectSignOut +
      '&client_id=' +
      clientId;
     window.location.assign(url);
  };

  onInputChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    sessionStorage._sessionToken = "";
    sessionStorage.setItem("loginClient", "cognito");
    const { username, password } = this.state;
    this.setState({...this.state , loader : true})
    if (username && password) {
      this.props.getLoginRequest();
      Auth.signIn(username, password)
        .then((user) => {
          console.log("user details" ,user)
          this.props.getLoginSuccess(user);
          this.props.getUserInfo();
        })
        .catch((err) => {
          this.props.getLoginFailure(err);
          this.setState({...this.state , loader : false})
        });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    const handleEnterKeyPress = (e) => {
      if (e.charCode === keyConstants.ENTER) {
        this.handleSubmit(_global.submit);
      }
    };


    return null;
  }
}

LoginForm = reduxForm({
  form: "login",
})(LoginForm);

export default withRouter(withOAuth(LoginForm));
