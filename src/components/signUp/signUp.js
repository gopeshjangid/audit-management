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
import "./scss/signup.css";
import AutoSuggestDropDown from "../autoSuggestDropDown/autoSuggestDropDown";
import { verifyEmail, verifyPassword } from "../../helpers/utility";
import Logo from "./../../assets/images/centivo-logo-new.svg";
import { serviceAPI } from "../../services/service.api";

export const formConstants = {
  EMPTY_EMAIL_MESSAGE: "Please enter email.",
};

export const UserTypes = [
  { label: "Auditor", value: "Auditor" },
  { label: "Examiner", value: "Examiner" },
];

function Signup(props) {
  const initialForm = {
    userType: "",
    userName: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setError] = useState({
    userName: false,
    password: false,
    confirmPassword: false,
  });

  const [isSubmitted, setSubmitted] = useState(false);
  const history = useHistory();
  const [message, setMessage] = useState({ type: "", message: "" });
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  // const [otpSent, setOtpSent] = useState(false);

  const validUserType = ["Auditor", "Examiner"];
  const clearHandler = () => {
    if (step > 1) {
      setMessage({type : "error" ,message : ''})
      if(step ===2){
        setCode("");
        setForm({...form});
      }
      setStep((prev) => prev - 1);
    } else {
      history.push("/");
    }
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const _errors = { ...errors };
    if (name === "userName") {
      _errors.email = verifyEmail(value);
    }

    if (name === "password") {
      _errors.password = verifyPassword(value) ? verifyPassword(value) : "";
    }

    if (name === "confirmPassword") {
      _errors.confirmPassword =
        value && form.password !== value ? " Password does not match." : "";
    }
   

    setForm({ ...form, [name]: value });
    setError(_errors);
  };

  const apiHandler = (data, apiMethod) => {
    apiMethod(data)
      .then((res) => {
        setSubmitted(false);
        const message =
          (res.data && res.data.resultObject) ||
          (res.response && res.response.data.resultObject) ||
          "";
        const code =
          (res.data && res.data.resultCode) ||
          (res.response && res.response.data.resultCode) ||
          "400";

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
          // if (step === 1) {
          //   setOtpSent(true);
          // }

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
    e.preventDefault();
    setSubmitted(true);
    if (step === 1) {
      apiHandler({ email: form.userName }, serviceAPI.verifyUserEmail);
      return;
    } else if (step === 2) {
      apiHandler(
        { accessCode: code, email: form.userName },
        serviceAPI.verifyaccesscode
      );
    } else {
      if (validUserType.indexOf(form.userType) === -1) {
        setMessage({ type: "error", message: "Select valid user type" });
        return;
      }
     
      if (form.confirmPassword)
        serviceAPI
          .createNewUser(form)
          .then((res) => {
            setSubmitted(false);
            if (res.data.resultCode === "200") {
              history.push("/?success=true");
            } else {
              setMessage({ type: "error", message: res.data.resultObject });
            }
          })
          .catch((err) => {
            setMessage({
              type: "error",
              message: err.data.resultObject || err.message,
            });
            setSubmitted(false);
          });
    }
  };

  const checkIfvalidUserType = (val) => {
    return validUserType.indexOf(val) > -1;
  };
  return (
    <div className="form-wrapper">
      <div className="mlogo p10">
        <img src={Logo} alt="" className="logo-navbar" />
      </div>
      <div className="new-user-title p10">New User Registration</div>
      {step ===1  && <div class="subtitle text-grey margin-bottom-25 text-center">
        {step === 1
          ? "Please enter your email, and we will verify your account."
          : ""
        }
      </div>
      
       }
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
            </div>)
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
              {step === 1 ? (
                <FormGroup row>
                  <Label for="email" className="text-right" sm={4}>
                    Email<span className="text-danger ">*</span>
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="userName"
                      id="userName"
                      className="text-input"
                      placeholder="Enter email"
                      autoComplete="off"
                      value={form.userName}
                      onChange={changeHandler}
                      tabIndex="2"
                    />
                    {errors.email && (
                      <span className=" error-message">{errors.email}</span>
                    )}
                  </Col>
                </FormGroup>
              ) : step === 2 ? (
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
              ) : (
                <>
                <FormGroup row>
                    <Label for="firstName" className="text-right" sm={4}>
                      First Name<span className="text-danger">*</span>
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="text-input"
                        placeholder="Enter First Name"
                        value={form.firstName}
                        onChange={changeHandler}
                        tabIndex="3"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Label for="lastName" className="text-right" sm={4}>
                    Last Name<span className="text-danger">*</span>
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="text-input"
                      placeholder="Enter Last Name"
                      value={form.lastName}
                      onChange={changeHandler}
                      tabIndex="3"
                    />
                  </Col>
                </FormGroup>
                  <FormGroup row>
                    <Label for="memberId" sm={4} className="text-right">
                      User type<span className="text-danger">*</span>
                    </Label>
                    <Col sm={8}>
                      <AutoSuggestDropDown
                        name="usertype"
                        placeholderVal="User Type"
                        defaultValue={form.userType}
                        suggestionValue={UserTypes}
                        onChangeHandler={(e) => {
                          setForm((form) => ({ ...form, userType: e }));
                          setMessage({
                            ...message,
                            message: checkIfvalidUserType(e)
                              ? ""
                              : message.message,
                          });
                        }}
                        autoComplete="off"
                        hideIcon
                      />
                      {/* {error.memberId && (
                      <span className="text-danger">
                        {' '}
                        {formConstants.FILL_MEMBER_ID}{' '}
                      </span>
                    )} */}
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
                      Re type password<span className="text-danger">*</span>
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
                      disabled={
                        (step > 1 &&
                          !(
                            form.userType &&
                            form.password &&
                            form.confirmPassword &&
                            !errors.password &&
                            !errors.confirmPassword
                          )) ||
                        (step === 1 &&
                          (form.userName === "" ||
                            (form.userName && errors.email))) ||
                        isSubmitted
                      }
                    >
                      {step === 1 ? "Request Verification Code" : "Sign Up"}
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

export default Signup;
