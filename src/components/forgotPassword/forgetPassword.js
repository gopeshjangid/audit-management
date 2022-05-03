import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  Form,
  FormGroup,
  Col,
  Label,
  Button,
  Row,
  Input,
} from "reactstrap";
import "./scss/forgotPassword.css";
import { verifyEmail, verifyPassword } from "../../helpers/utility";
import Logo from "./../../assets/images/centivo-logo-new.svg";
import { serviceAPI } from "../../services/service.api";

export const formConstants = {
  EMPTY_EMAIL_MESSAGE: "Please enter email.",
};

function ForgotPassword(props) {
  const initialForm = {
    userName: "",
    confirmPassword: "",
    password: "",
  };

  const [form, setForm] = useState(initialForm);
  const [email, setEmail] = useState("");
  const [errors, setError] = useState({
    userName: false,
    confirmPassword: false,
    password: false,
    email: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");

  const [isSubmitted, setSubmitted] = useState(false);
  const history = useHistory();
  const [message, setMessage] = useState({ type: "", message: "" });

  const clearHandler = () => {
    if (step === 1) {
      history.push("/");
    } else {
      if (step >1 ) {
        setCode("");
      }

      if (message.message) {
        setMessage({ type: "", message: "" });
      }
      setStep((prev) => prev - 1);
    }
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const _errors = { ...errors };
    if (name === "userName") {
      _errors.userName = verifyEmail(value);
    }

    if (name === "password") {
      _errors.password = verifyPassword(value) ? verifyPassword(value) : "";
    }

    if (name === "confirmPassword") {
      _errors.confirmPassword =
        value && form.password !== value ? " Password does not match." : "";
    }

    if (name === "email") {
      _errors.email = verifyEmail(value);
      setEmail(value);
    } else {
      setForm({ ...form, [name]: value });
    }
    setError(_errors);
  };

  const apiHandler = (data, apiMethod) => {
    apiMethod(data)
      .then((res) => {
        setSubmitted(false);
        const message = res.data && res.data.resultObject || res.response && res.response.data.resultObject || '';
        const code = res.data && res.data.resultCode || res.response && res.response.data.resultCode || '400';

        if (code !== "200" && step === 2) {
          setMessage({
            type: "error",
            message: message || "Please enter correct access code!",
          });
          return;
        } else if (code === "400") {
          setMessage({
            type: "error",
            message: message || "Please enter correct access code!",
          });
        } else {
          if (step === 1) {
            setOtpSent(true);
          } 
          
          if (step < 3) {
            setStep((prev) => prev + 1);
            setMessage({
              type: "success",
              message: message || "",
            });
          } else {
            history.push("/?resetpwd=true");
          }
        }
        return res.response;
      })
      .catch((err) => {
        setMessage({
          type: "error",
          message: err.message,
        });
        setSubmitted(false);
      });
  };

  const submitHandler = (e) => {
    setSubmitted(true);
    if (step === 2) {
      apiHandler({ accessCode: code, email }, serviceAPI.verifyaccesscode);
    } else if (step === 3) {
      apiHandler(form, serviceAPI.resetpassword);
    } else {
      apiHandler({ email }, serviceAPI.sendAccessCode);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="mlogo p10">
        <img src={Logo} alt="" className="logo-navbar" />
      </div>
      <div className="new-user-title p10">
        {step === 1
          ? "Forgot your password?"
          : step === 2 && otpSent
          ? "Enter verification Code"
          : "Enter new password"}
      </div>
      <div class="subtitle text-grey margin-bottom-25 text-center">
        {step === 1
          ? "Please enter your email, and we will send you a verification"
          : step === 2 && otpSent
          ? "We have sent a verification code to " + email
          : ""}
      </div>
      <div className="text-center loader-box">
        {isSubmitted ? (
          <ClipLoader loading={true} />
        ) : (
          message.message && (
            <div
              className={
                message.type === "error" ? "danger-message" : "success-text"
              }
            >
              {message.message}
            </div>
          )
        )}
      </div>
      <div className="form-container search">
        <Row>
          <Col
            sm={{ size: 12 }}
            md={{ size: 10, offset: 1 }}
            lg={{ size: 8, offset: 1 }}
          >
            <Form className="input-custom member-search-form">
              {step === 2 ? (
                <FormGroup row>
                  <Label for="email" className="text-right" sm={4}>
                    Access Code<span className="text-danger ">*</span>
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="code"
                      id="firstName"
                      className="text-input"
                      placeholder="Enter access code"
                      autoComplete="off"
                      value={code}
                      onChange={(e) => {
                        if (!/[^0-9]/g.test(e.target && e.target.value)) {
                          setCode(e.target.value);
                        }
                      }}
                      tabIndex="2"
                      maxLength={6}
                    />
                    {/* {errors.email && (
                      <span className=" error-message">{errors.email}</span>
                    )} */}
                  </Col>
                </FormGroup>
              ) : step === 3 ? (
                <>
                  <FormGroup row>
                    <Label for="email" className="text-right" sm={4}>
                      Email<span className="text-danger ">*</span>
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        name="userName"
                        id="firstName"
                        className="text-input"
                        placeholder="Enter email"
                        autoComplete="off"
                        value={form.firstName}
                        onChange={changeHandler}
                        tabIndex="2"
                      />
                      {errors.userName && (
                        <span className=" error-message">
                          {errors.userName}
                        </span>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="lastName" className="text-right" sm={4}>
                      Password<span className="text-danger">*</span>
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="password"
                        name="password"
                        id="lastName"
                        className="text-input"
                        placeholder="Enter password"
                        autoComplete="off"
                        value={form.password}
                        onChange={changeHandler}
                        tabIndex="3"
                      />
                      {errors.password && (
                        <span className="text-danger error-message">
                          {errors.password}
                        </span>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="dob" className="text-right " sm={4}>
                      Confirm Password<span className="text-danger">*</span>
                    </Label>
                    <Col sm={8} className="custom-calendar">
                      <Input
                        type="password"
                        name="confirmPassword"
                        id="dob"
                        className="text-input"
                        placeholder="Re enter password"
                        autoComplete="off"
                        value={form.confirmPassword}
                        onChange={changeHandler}
                        tabIndex="4"
                      />
                      {errors.confirmPassword && (
                        <span className="text-danger error-message">
                          {errors.confirmPassword}
                        </span>
                      )}
                    </Col>
                  </FormGroup>
                </>
              ) : (
                <FormGroup row>
                  <Label for="email" className="text-right" sm={4}>
                    Email<span className="text-danger ">*</span>
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      className="text-input"
                      placeholder="Enter email"
                      autoComplete="off"
                      value={email}
                      onChange={changeHandler}
                      tabIndex="1"
                    />
                    {errors.email && (
                      <span className=" error-message">{errors.email}</span>
                    )}
                  </Col>
                </FormGroup>
              )}

              {step === 2 ? (
                <FormGroup row>
                  <Label for="dob" className="text-right" sm={4}>
                    &nbsp;
                  </Label>
                  <Col sm={{ size: 8 }} className="">
                    <Button
                      type="button"
                      className="signup-btn"
                      tabIndex="5"
                      onClick={submitHandler}
                      disabled={!code || isSubmitted}
                    >
                      Submit
                    </Button>
                  </Col>
                </FormGroup>
              ) : step === 3 ? (
                <FormGroup row>
                  <Label for="dob" className="text-right" sm={4}>
                    &nbsp;
                  </Label>
                  <Col sm={{ size: 8 }} className="">
                    <Button
                      type="button"
                      className="signup-btn"
                      tabIndex="5"
                      onClick={submitHandler}
                      disabled={
                        !(
                          form.userName &&
                          form.password &&
                          form.confirmPassword &&
                          !errors.userName &&
                          !errors.password &&
                          !errors.confirmPassword
                        ) || isSubmitted
                      }
                    >
                      Reset password
                    </Button>
                  </Col>
                </FormGroup>
              ) : (
                <FormGroup row>
                  <Label for="dob" className="text-right" sm={4}>
                    &nbsp;
                  </Label>
                  <Col sm={{ size: 8 }} className="">
                    <Button
                      type="button"
                      className="signup-btn"
                      tabIndex="5"
                      onClick={submitHandler}
                      disabled={!email || errors.email || isSubmitted}
                    >
                      Request Verification Code
                    </Button>
                  </Col>
                </FormGroup>
              )}

              <FormGroup row>
                <Label for="dob" className="text-right" sm={4}>
                  &nbsp;
                </Label>
                <Col sm={{ size: 8 }}>
                  <Button
                    type="button"
                    className="primary-cancel"
                    tabIndex="6"
                    onClick={clearHandler}
                  >
                    Cancel
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ForgotPassword;
