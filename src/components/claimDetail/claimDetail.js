import React, { Component, lazy, Suspense } from "react";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LeftArrow from "@atlaskit/icon/glyph/arrow-left";
import Button from "@atlaskit/button";

import "./scss/claimDetail.scss";
import ModalMessage from "../../DesignSystem/ModalMessage";
import { getOptionValue, getLabelValue } from "../../helpers/utility";
import {
  clearSelectedClaim,
  saveClaimCategories,
  saveActionData,
} from "../../actions/action.getClaims";

import Layout from "../layout/layout";
import TextField from "../../DesignSystem/TextField";
import { Label } from "../../DesignSystem/FormFields";
import Select from "../../DesignSystem/Select";
import Accordion from "../../DesignSystem/Accordion";
import ActionForm from "./actionForm";
import Tabs from "../../DesignSystem/ActionTabs";

import { AUDIT_STATUS_VALUE, USER_ROLE } from "../../constants/constant.app";
import Loader from "../../DesignSystem/Loader";
import HelperMessage from "../../DesignSystem/HelperMessage";
import ToolTip from "../../DesignSystem/Tooltip";
const ShowSaveChecklists = lazy(() => import('./showSaveChecklists'));
const HistoryList = lazy(() => import('../../DesignSystem/HistoryList'));

const paymentType = [
  { label: "NA", value: "NA" },
  { label: "Over Payment", value: "overPayment" },
  { label: "Under Payment", value: "underPayment" },
];
const paymentNAValues = ["", "0", null];

const GetErrorMessage = ({isCatValid, isPaymentType,  isAuditorComment, isMonetoryValue}) => {
  return (
    <ul>
    {isCatValid && <li>One or more categories still left to mark.</li>}
    {isAuditorComment && <li>Auditor's Note is mandatory inside the comment section.</li>}
    {isPaymentType && <li>Payment type must need to select either Over Payment or Under Payment.</li>}
    {isMonetoryValue && <li>Monetary value cannot be empty when error type is Payment.</li>}
  </ul>)
}

class ClaimDetailComponent extends Component {
  constructor(props) {
    super(props);
    const claimPaymentType = paymentNAValues.indexOf(this.props.claim.paymentType) !== -1  ? "NA": this.props.claim.paymentType;
    const overOrUnderPayment = getLabelValue(paymentType, claimPaymentType);
    const finAcc = this.props.getClaims.selectedClaims.financialAccuracy === "Infinity" ? "0.00" : this.props.getClaims.selectedClaims.financialAccuracy;
    this.state = {
      errorMessage: "",
      claimNumber: this.props.getClaims?.selectedClaims?.claimNumber || 0,
      errorType: {
        label: (this.props.errorType === 'NO_ERROR' ? 'NO ERROR': this.props.errorType ),
        value: this.props.errorType,
      },
      history: this.props.claim.history,
      showWarning: false,
      financialAccuracy: finAcc ? parseFloat(finAcc).toFixed(2)
        : (this.props.getClaims?.selectedClaims?.paymentType === 'NA' && "100.00") || '100.00',
      monetoryValue: this.props.getClaims?.selectedClaims?.paymentType === 'NA' ? '' : this.props.getClaims?.selectedClaims?.monetaryValue || "",
      selectedPaymentType: overOrUnderPayment,
      assignee: {
        label: this.props.getClaims?.selectedClaims?.assignee || "Unassigned",
        value: this.props.getClaims?.selectedClaims?.assignee || "Unassigned",
      },
      auditStatus: {
        label: this.props.getClaims.selectedClaims.auditStatus,
        value: this.props.getClaims.selectedClaims.auditStatus,
      },
      note: "",
      paymentType: {
        label: this.props.getClaims?.selectedClaims?.paymentType || "NA",
        value: this.props.getClaims?.selectedClaims?.paymentType || "NA",
      },
      errors: {
        monetory: false,
        financial: false,
      },
      initialMonetoryValue: this.props.getClaims?.selectedClaims?.paymentType === 'NA' ? '' :  this.props.getClaims?.selectedClaims?.monetaryValue || '',
      initialPaymentType:
        this.props.getClaims?.selectedClaims?.paymentType || "NA",
      errorTypeMessage: "",
      paymentError : false,
      monetaryError :false
    };
    this.scrollRef = React.createRef();
    window.scrollTo(0, 0);
    this.handleBack = this.handleBack.bind(this);
   
  }

  handleBack = (e) => {
    e.preventDefault();
    this.props.clearSelectedClaim();
  };

  validateMonetoryValue = (value, paymentType) => {
    const _errors = { ...this.state.errors };

    _errors.monetory = false;// parseFloat(this.props.claim.totalPayment) === 0;
    _errors.financial = false; // paymentType.label !== "NA" 
      // && parseFloat(this.props.claim.totalPayment) === 0.0;

    return _errors;
  };


  calculateFinanceValue = (monetoryValue, paymentType) => {
    monetoryValue = Number(monetoryValue);
    if (paymentType?.label === "NA") {
      return "100.00";
    }
    let monValue = parseFloat(monetoryValue);
    let totalPayment = parseFloat(this.props.claim.totalPayment);
    if (totalPayment === 0) {
      return "0.00";
    }
    const financialValue = (totalPayment - monValue) / totalPayment;
    return (financialValue* 100).toFixed(2) ;
  };

  monetoryHandler = (e) => {
    const monetoryValue = e?.target?.value ? e.target.value : '';
    const totalFinancialValue = this.calculateFinanceValue(
      monetoryValue,
      this.state.paymentType
    );
    const _errors = this.validateMonetoryValue(
      monetoryValue,
      this.state.paymentType
    );
    this.setState({
      ...this.state,
      monetoryValue: monetoryValue,
      financialAccuracy: totalFinancialValue,
      errors: _errors,
    });
  };

  saveActionData = (payload) => {
    this.props.saveActionData(payload);
  };

 
  checkAllCategoriesFilled = () => {
    if(this.props.masterCategoriesLength === this.props.categories.length){
      return this.props.categories.some(val => val.indicator === "NA");
    }else{
      return true;
    }
  }

  checkStatusCanBeChange = ()=> {
    const isCatValid = this.checkAllCategoriesFilled();
    const isAuditorComment = this.props.isAuditorComment;
    const isMonetoryValue =  this.props.errorType.toUpperCase() === "PAYMENT" && ( this.props.getClaims.selectedClaims.monetaryValue === "0" || this.props.getClaims.selectedClaims.monetaryValue === "" || this.props.getClaims.selectedClaims.monetaryValue === null)
    const isPaymentType = this.props.errorType.toUpperCase() === "PAYMENT" && (this.props.getClaims.selectedClaims.paymentType === "NA" || this.props.getClaims.selectedClaims.paymentType === null) 
    this.setState({
      ...this.state,
      showWarning: false,
      errorMessage: <GetErrorMessage isPaymentType={isPaymentType} isCatValid={isCatValid} isAuditorComment={!isAuditorComment} isMonetoryValue={isMonetoryValue}/>,
    });
    return isCatValid || !isAuditorComment || isMonetoryValue;
  }
  
  selectHandler = (name, value) => {

    if(localStorage.getItem("userType") === USER_ROLE.auditor && name === "auditStatus" && (AUDIT_STATUS_VALUE.examinerReview === value.value || AUDIT_STATUS_VALUE.closed === value.value )){
      if(this.checkStatusCanBeChange()){
        return ;
      }
    }

    if (name === "assignee") {
      localStorage.setItem("assignee", value);
    }

    let updateState = {
      [name === "auditStatus" ? "status" : name]: value.value,
      claimNumber: this.state.claimNumber,
      user: localStorage.getItem("userName"),
      userRole: localStorage.getItem("userType"),
    };

    if (
      name === "assignee" &&
      value.value !== "Unassigned" &&
      this.state.auditStatus.label === AUDIT_STATUS_VALUE.open &&
      this.state.assignee.label === "Unassigned"
    ) {
      updateState["status"] = AUDIT_STATUS_VALUE.inProgress;
      this.setState({
        ...this.state,
        [name]: value,
        auditStatus: {
          label: AUDIT_STATUS_VALUE.inProgress,
          value: AUDIT_STATUS_VALUE.inProgress,
        },
      });
    } else if (
      name === "auditStatus" &&
      value.value !== AUDIT_STATUS_VALUE.open &&
      this.state.auditStatus.label === AUDIT_STATUS_VALUE.open &&
      this.state.assignee.label === "Unassigned"
    ) {
      updateState["assignee"] = localStorage.getItem("userName");
      this.setState({
        ...this.state,
        [name]: value,
        assignee: {
          label: localStorage.getItem("userName"),
          value: localStorage.getItem("userName"),
        },
      });
    } else if (name === "auditStatus" && value.value === AUDIT_STATUS_VALUE.examinerReview ){
      updateState["assignee"] = this.props.claim?.examinerName || '';
      this.setState({
        ...this.state,
        [name]: value,
        assignee: {
          label: this.props.claim?.examinerName,
          value: this.props.claim?.examinerName,
        },
      });
    } else if (name === "auditStatus" && value.value === AUDIT_STATUS_VALUE.reviewComplete ){
      updateState["assignee"] = this.props.getClaims?.selectedClaims?.auditor || '';
      this.setState({
        ...this.state,
        [name]: value,
        assignee: {
          label: this.props.getClaims?.selectedClaims?.auditor,
          value: this.props.getClaims?.selectedClaims?.auditor,
        },
      });
    } else {
      this.setState({ ...this.state, [name]: value });
    }
    this.saveActionData(updateState);
  };

  scrollToMyRef = (isSave, calculatedErrorType) => {
    let ele = document.getElementById("scrollbar");
    ele.scrollTop = 0;
    const isCatValid = this.checkAllCategoriesFilled();
    if(isCatValid && isSave){
      if(calculatedErrorType) {
        this.setState({
          ...this.state,
          showWarning: true,
          errorMessage: "You still left to mark one or more categories.",
          errorType: {
            label: calculatedErrorType,
            value: calculatedErrorType
          }
        });
      }else{
        this.setState({
          ...this.state,
          showWarning: true,
          errorMessage: "You still left to mark one or more categories.",
        });
      }
     
    }else if(isSave && calculatedErrorType){
      this.setState({
        errorType: {
          label: calculatedErrorType,
          value: calculatedErrorType
        }
      });
    }
  };

  paymentTypeHandler = (value) => {
    const financialValues = this.calculateFinanceValue(
      this.state.monetoryValue,
      value
    );
    const _errors = this.validateMonetoryValue(this.state.monetoryValue, value);
    this.setState({
      ...this.state,
      paymentType: value,
      financialAccuracy: value?.label === "NA" ? "100.00" : financialValues,
      monetoryValue : value?.label === "NA" ? '' : this.state.monetoryValue,
      initialMonetoryValue : value?.label === "NA" ? '' : this.state.initialMonetoryValue,
      errors: _errors,
    });
  };

  getAuditStatusRoleBased = () => {
    let statusList = this.props?.masterTable?.auditStatus;
    let role = localStorage.getItem("userType");
    let auditorList = ["REVIEW-COMPLETE"];
    let examinerList = ["EXAMINER-REVIEW", "REVIEW-COMPLETE"];

    statusList = statusList.filter((status) => {
      if (role === "AUDITOR") {
        return auditorList.indexOf(status.label) === -1;
      } else {
        return examinerList.indexOf(status.label) > -1;
      }
    });
    return statusList;
  };

  updateErrorMessage = () => {
    this.setState({
      ...this.state,
      errorMessage: "",
    });
  };

  checkError = (errorType) =>{
   
    if(errorType === 'PAYMENT'){
      return true;
    } else {

      return paymentType ==='NA' || this.state.monetoryValue !==''
    }

  }

  enableSaveFromErrorType = (value) => {
    const isTotalPayment = parseFloat(this.props.claim.totalPayment ) === 0 || isNaN(parseFloat(this.props.claim.totalPayment ))
    if(isTotalPayment && value.value === "PAYMENT"){
      this.setState({
        errorTypeMessage: "Please use the valid option.",
        error : true

      });
    } else {
      this.setState({ 
        ...this.state, 
        errorType : value,
        errorTypeMessage: "",

      });
    }
  }

  saveFinancialValueHandler = () => {
    let updatedData = {
      monetoryValue: this.state.monetoryValue === ""? "0": this.state.monetoryValue,
      paymentType: this.state.paymentType?.label,
      financialAccuracy: this.state.financialAccuracy,
      errorType: this.state.errorType?.value,
      claimNumber: this.state.claimNumber,
      user: localStorage.getItem("userName"),
      userRole: localStorage.getItem("userType"),
    };
    this.saveActionData(updatedData);
    this.setState({ 
      ...this.state, 
      initialPaymentType :  this.state.paymentType?.label,
      initialMonetoryValue : this.state.monetoryValue
    });
  };

  cancelHandler = () => {
    const financialValues = this.calculateFinanceValue(
      this.state.initialMonetoryValue,
      { label: this.state.initialPaymentType }
      
    );
    this.setState({
      ...this.state,
      errorType: { label : this.props.claim.errorType === "NO_ERROR" ? "NO ERROR": this.props.claim.errorType  ,value : this.props.claim.errorType } ,
      monetoryValue: this.state.initialMonetoryValue,
      paymentType: { label : this.state.initialPaymentType ,value : this.state.initialPaymentType } ,
      financialAccuracy: financialValues,
    });
  };
  render() {
    const {
      claimProcessDate,
      totalCharge,
      claimNumber,
      groupName,
      examinerName,
      claimStatus,
      auditType,
      totalPayment,
      claimType,
      history
    } = this.props.claim;
    let selectedClaimType = this.props.claimTypes.find(val => val.value === claimType);
    let role = localStorage.getItem("userType");
    const isSaveCancelEnabled = (this.state.errorType.value !== this.props.errorType || this.state.paymentType.value !== this.state.initialPaymentType || this.state.monetoryValue !== this.state.initialMonetoryValue );
    const isMonetoryError = ((this.state.errorType?.value ==='PAYMENT' && Number(this.state.monetoryValue) ===0) || (this.state.errorType?.value !=='PAYMENT' && Number(this.state.monetoryValue) !==0));
    const isPaymentTypeError = ((this.state.errorType?.value ==='PAYMENT' && this.state.paymentType?.value ==='NA') || (this.state.errorType?.value !=='PAYMENT' && this.state.paymentType?.value !=='NA'));
    return (
      <Layout>
        <ModalMessage
          actionHandler={(status) => this.updateErrorMessage(status)}
          open={!!this.state.errorMessage}
          message={this.state.errorMessage}
          type={this.state.showWarning? "warning": "error"}
        />
        <Loader text="Please wait..." open={this.props.loading} />
        <Row>
          <Col style={{ paddingLeft: "0px" }} sm={12}>
            <Button
              iconBefore={<LeftArrow label="Star icon" size="small" />}
              appearance="primary"
              style={{
                paddingLeft: "0px",
                cursor: "pointer",
                width: "75px",
                marginBottom: "15px",
              }}
              onClick={this.handleBack}
            >
              Back
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={9} className="leftBox" id="scrollbar">
            <Row>
              <Col sm={3}>
                <Label> Claim Number </Label>
                <TextField
                  value={claimNumber}
                  isReadOnly
                  label="Claim Number"
                />
              </Col>
              <Col sm={3}>
                <Label> Processed Date </Label>
                <TextField isReadOnly value={claimProcessDate} />
              </Col>
              <Col sm={3}>
                <Label> Total Charges </Label>
                <TextField isAmount before="$" isReadOnly value={totalCharge} />
              </Col>
              <Col sm={3}>
                <Label> Total Payment </Label>
                <TextField
                  isAmount
                  before="$"
                  isReadOnly
                  value={totalPayment}
                />
                
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Accordion>
                  <Row>
                    <Col sm={3}>
                      <Label> Group </Label>
                      <TextField value={groupName} isReadOnly />
                    </Col>
                    <Col sm={3}>
                      <Label> Claim Type</Label>
                      <TextField
                        isAmount
                        isReadOnly
                        value={selectedClaimType?.label || ""}
                      />
                    </Col>
                    <Col sm={3}>
                      <Label> Claim Status </Label>
                      <TextField isReadOnly value={claimStatus} />
                    </Col>
                    <Col sm={3}>
                      <Label> Audit Type </Label>
                      <TextField isReadOnly value={auditType} />
                    </Col>
                  </Row>
                </Accordion>
              </Col>
            </Row>
            <Row></Row>
            <Row>
              <Col sm={12}>
              <Suspense fallback={<div />}>
                <Accordion title="Checklists">
                  <ShowSaveChecklists scrollToMyRef={this.scrollToMyRef} />
                </Accordion>
              </Suspense>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <h6>Activity</h6>
                <Tabs list={[<ActionForm />, <Suspense fallback="Loading..."> <HistoryList list={history || []} /></Suspense>]} />
              </Col>
            </Row>
          </Col>
          <Col sm={3} className="rightBox">
            <Row className="flexBox">
              <Col>
                <Label>Status</Label>
                <Select
                  onChange={(value) => this.selectHandler("auditStatus", value)}
                  value={this.state.auditStatus}
                  options={this.getAuditStatusRoleBased()}
                  isDisabled={role ==='EXAMINER' && this.state.auditStatus?.label === AUDIT_STATUS_VALUE.reviewComplete}
                />
              </Col>
            </Row>

            <Row className="flexBox">
              <Col>
                <Label>Assignee</Label>
                <Select
                  onChange={(value) => this.selectHandler("assignee", value)}
                  value={this.state.assignee}
                  options={this.props.masterTable.allUser}
                  isDisabled={role !== "AUDITOR"}
                />
              </Col>
            </Row>
            <Row className="flexBox">
              <Col>
                <Label>Examiner</Label>
                <TextField isReadOnly value={examinerName} />
              </Col>
            </Row>

            <Row className="flexBox">
              <Col>
                <Label>Financial Accuracy (%)</Label>
                <TextField
                  value={this.state.financialAccuracy}
                  isReadOnly={role !== "AUDITOR"}
                  onChange={(e)=> {}}
                />
                {this.state.errors.financial && (
                  <HelperMessage error={true}>Invalid value.</HelperMessage>
                )}
              </Col>
            </Row>

            <Row className="flexBox">
              <Col>
               <Label> Error Type </Label>
                <Select
                  onChange={this.enableSaveFromErrorType}
                  value={this.state.errorType}
                  options={this.props.errorTypeList}
                  isDisabled={role !== "AUDITOR"}
                />
                {this.state.errorTypeMessage && (
                  <HelperMessage error={true}>{this.state.errorTypeMessage}</HelperMessage>
                )}
              </Col>
            </Row>

            <Row className="flexBox">
              <Col>
                <Label> Payment Type </Label>
                <Select
                  value={this.state.paymentType}
                  defaultValue={{ label: "NA", value: "NA" }}
                  onChange={this.paymentTypeHandler}
                  isDisabled={role !== "AUDITOR"}
                  name="paymentType"
                  options={[
                    { label: "NA", value: "NA" },
                    { label: "Over Payment", value: "Over Payment" },
                    { label: "Under Payment", value: "Under Payment" },
                  ]}
                />
                {isPaymentTypeError && (
                  <HelperMessage error={true}>Invalid payment type</HelperMessage>
                )}
              </Col>
            </Row>
            <Row className="flexBox">
              <Col>
                <Label>Monetary Value</Label>
                <ToolTip
                  content={this.state.errors.monetory && "Invalid Value"}
                >
                  <TextField
                    onChange={this.monetoryHandler}
                    value={this.state.monetoryValue}
                    isReadOnly={
                      this.state.errors.monetory ||
                      role !== "AUDITOR" ||
                      this.state.paymentType.label === "NA"
                    }
                  />
                  {isMonetoryError && (
                  <HelperMessage error={true}>Invalid monetary value</HelperMessage>
                )}
                </ToolTip>
              </Col>
            </Row>
            {
              isSaveCancelEnabled &&
              
              !this.state.errors.financial && (
                <Row className="flexBox">
                  <Col style={{ textAlign: "right", marginTop : 15 }}>
                    <Button onClick={this.cancelHandler}>Cancel</Button>{" "}
                    &nbsp;&nbsp;
                    <Button
                      onClick={this.saveFinancialValueHandler}
                      appearance="primary"
                      size="medium"
                      isDisabled={this.state.errorTypeMessage || isMonetoryError || isPaymentTypeError}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              )}
          </Col>
        </Row>
      </Layout>
    );
  }
}

/**
 * redux mapping of dispatched events to props function
 * @param {object} dispatch
 * @return {object}
 */
const mapDispatchToProps = (dispatch) => ({
  clearSelectedClaim: () => dispatch(clearSelectedClaim()),
  saveClaimCategories: (data) => dispatch(saveClaimCategories(data)),
  saveActionData: (data) => dispatch(saveActionData(data)),
});

/**
 * redux mapping of state to props function
 * @param {object} state
 * @return {object}
 */
const mapStateToProps = (state) => {
  let formattedActions = state.getClaims.selectedClaims.actions
      .map((action) => {
        action.text = action.notes;
        return action;
      })
      .sort((a, b) => b.timestamp - a.timestamp);
  const data = formattedActions.some(val => val.userRole === USER_ROLE.auditor && val.text);
  return {
    ...state,
    claim: state.getClaims.selectedClaims,
    isAuditorComment: data,
    categories: state.getClaims.selectedClaims.detailedCategories,
    masterCategoriesLength:
      state.masterTable.categoriesSubCategories.length || 0,
    loading: state.getClaims.loading,
    searchError: state.getClaims.searchError,
    searchFields: state.getClaims.searchField,
    currentUser: state.login,
    errorType: state.getClaims?.selectedClaims?.errorType ?? "NO_ERROR",
    errorTypeList: state.masterTable?.errorTypes,
    claimTypes: state.masterTable?.claimTypes
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClaimDetailComponent));
