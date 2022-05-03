import React, { useState, useRef, useEffect, Suspense } from "react";
import { Form, FormGroup, Row, Col, Label, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import Layout from "../layout/layout";
import { CLAIM_GRID } from "../../constants/constant.gridColums";
import {
  getCategoriesSubCategories,
  getClaimsBySearch,
  getClaimDetail,
  updateExaminerAuditorName,
  getSelectedClaimByClaims,
  getClaimsByAssignee,
  clearAllClaims,
  updateErrorMessage,
} from "../../actions";
import Grid from "../Grid";
import "./scss/getClaims.scss";

import {
  getOptionValue,
  getLabelValue,
  checkValueIsExist ,
} from "../../helpers/utility";

import { serviceAPI } from "../../services/service.api";
import { AUDIT_STATUS_VALUE } from "../../constants/constant.app";
import Tabs from "./FilterTabs";
import Accordion from "../../DesignSystem/Accordion";
import { LoadingButton } from "@atlaskit/button";
import LoadingOverlay from "../../DesignSystem/Loader";
import ModalMessage from "../../DesignSystem/ModalMessage";
const MessageSection = React.lazy(() =>
  import("../../DesignSystem/SectionMessage")
);
const DateSelector = React.lazy(() => import("../dateSelector/dateSelector"));
const AutoSuggestDropDown = React.lazy(() =>
  import("../autoSuggestDropDown/autoSuggestDropDown")
);

function GetClaims(props) {
  const dispatch = useDispatch();
  const validationStyle = { border: "2px solid red" };
  const {
    claims,
    loading,
    GROUP_NAME,
    AUDITOR_NAME,
    ASSIGNEE_NAME,
    PAID_STATUS,
    EXAMINER_NAME,
    CLAIM_TYPE,
    AUDIT_STATUS_OPTION,
    searchField,
    selectedClaims,
    categoriesSubCategories,
    getClaims : {
      searchAction,
      errorMessage
    }
  } = props.parentProps;

  const [loader, setLoader] = useState(false);
  const [tab, setTab] = useState('');

  const [auditorNameValue, setAuditorNameValue] = useState(
    searchField.auditor || ""
  );
  const [auditStatus, setAuditStatus] = useState(searchField.auditStatus);
  const [groupNameValue, setGroupNameValue] = useState(searchField.groupName);
  const [examinerNameValue, setExaminerNameValue] = useState(
    searchField.examinerName
  );
  const messagesEndRef = useRef(null);
  const [claimProcessDateFrom, setClaimProcessDateFrom] = useState(
    searchField.claimProcessStartDate
  );
  const [claimProcessDateTo, setClaimProcessDateTo] = useState(
    searchField.claimProcessEndDate
  );
  const [claimType, setClaimType] = useState(searchField.claimType);
  const [paidStatus, setPaidStatus] = useState(searchField.claimStatus);
  const [greaterThanDollarAmount, setGreaterThanDollarAmount] = useState(
    searchField.greaterThanDollarAmount
  );
  const [validMessage, setValidMessage] = useState(null);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [auditCaseAssignee, setAuditCaseAssignee] = useState(
    searchField.assignee
  );
  const [validationError, setValidationError] = useState({
    auditStatusError: false,
    groupStatusError: false,
    examinerNameError: false,
    claimTypeError: false,
    paidStatusError: false,
    assigneeError: false,
  });
  const [tabs, setTabs] = useState({
    showAdvancedSearch: false,
    type: "ASSIGNEE",
  });
  const checkSearchKeyExist = (searchValues) => {
    const auditStatusError = searchValues.auditStatus
      ? checkValueIsExist(AUDIT_STATUS_OPTION, searchValues.auditStatus)
      : false;
    const groupStatusError = searchValues.groupName
      ? checkValueIsExist(GROUP_NAME, searchValues.groupName)
      : false;
    const examinerNameError = searchValues.examinerName
      ? checkValueIsExist(EXAMINER_NAME, searchValues.examinerName)
      : false;
    const paidStatusError = searchValues.paidStatus
      ? checkValueIsExist(PAID_STATUS, searchValues.paidStatus)
      : false;
    const claimTypeError = searchValues.claimType
      ? checkValueIsExist(CLAIM_TYPE, searchValues.claimType)
      : false;
    const assigneeError = searchValues.auditCaseAssignee
      ? checkValueIsExist(ASSIGNEE_NAME, searchValues.auditCaseAssignee)
      : false;
    const auditorNameError = searchValues.auditor
      ? checkValueIsExist(AUDITOR_NAME, searchValues.auditor)
      : false;

    setValidationError({
      auditStatusError,
      groupStatusError,
      examinerNameError,
      claimTypeError,
      paidStatusError,
      assigneeError,
      auditorNameError,
    });
    return (
      auditorNameError ||
      auditStatusError ||
      groupStatusError ||
      examinerNameError ||
      paidStatusError ||
      claimTypeError ||
      assigneeError
    );
  };


  useEffect(() => {
    window.scrollTo(
      0,
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  }, [claims]);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const handleClaimSearch = () => {
    const searchObject = {
      auditor: auditorNameValue,
      auditStatus: auditStatus,
      groupName: groupNameValue,
      examinerName: examinerNameValue,
      claimProcessStartDate: formatDate(claimProcessDateFrom),
      claimProcessEndDate: formatDate(claimProcessDateTo),
      claimType: claimType,
      claimStatus: paidStatus,
      greaterThanDollarAmount: greaterThanDollarAmount,
      assignee: auditCaseAssignee === "Unassigned" ? "" : auditCaseAssignee,
    };
    setFormSubmitted(true);
    const isValid = checkSearchKeyExist(searchObject);
    if (!isValid) {
      if (
        searchObject.claimProcessStartDate &&
        searchObject.claimProcessStartDate !== "Invalid date" &&
        searchObject.claimProcessEndDate &&
        searchObject.claimProcessStartDate !== "Invalid date"
      ) {
        setValidMessage(null);
        if (categoriesSubCategories.length === 0) {
          dispatch(getCategoriesSubCategories());
        }
        dispatch(getClaimsBySearch(searchObject));
      } else {
        setValidMessage("Please filled valid Claim Process from and to date");
      }
    } else {
      setValidMessage("Please fill valid options.");
    }
  };

  useEffect(() => {
    if (categoriesSubCategories.length === 0) {
      dispatch(getCategoriesSubCategories());
    }
  }, []);

  const tabHandler = (type) => {
    sessionStorage.setItem("selectedTab", type);
    localStorage.setItem("selectedTab", type);

    console.log("calling" ,type)
    setFormSubmitted(false);
    if (type !== "SEARCH") {
      searchByFilter(type);
    } else {
      dispatch(clearAllClaims());
    }
    setTabs({ ...tabs, showAdvancedSearch: type === "SEARCH", type: type });
  };

  const searchByFilter = (type) => {
    if (localStorage.getItem("login")) {
      setValidMessage(null);
      dispatch(
        getClaimsByAssignee({
          data: type === "ASSIGNEE" ? localStorage.getItem("login") : type,
          type,
        })
      );
    } else {
      setValidMessage("Oops ! Something went wrong");
    }
  };

  const fetchData = (userName) =>{

    if((PAID_STATUS === undefined || PAID_STATUS.length === 0 ) && userName){
      setLoader(true);
      serviceAPI
        .getConfigApi()
        .then((res) => {
          const users = res.data;
          localStorage.setItem("userType", users.userType ?? "");
          localStorage.setItem("userName", users.userName || userName);
          dispatch(updateExaminerAuditorName(users));
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          setValidMessage("Oops! something went wrong.");
          window.scrollTo(0, 0);
        });
    }
  }

  useEffect(() => {
    
    let userName = localStorage.getItem("CognitoIdentityServiceProvider.6ol8p8d3ggmn8jk2erls40dr2i.LastAuthUser");
    
    if(!userName){
      setLoader(true);
      setTimeout(()=>{
        let userName = localStorage.getItem("CognitoIdentityServiceProvider.6ol8p8d3ggmn8jk2erls40dr2i.LastAuthUser");
        localStorage.setItem("login" ,userName);
        fetchData(userName);
        searchByFilter("ASSIGNEE");
        setLoader(false);
        console.log("calling internal========")
      },5000)
    } else {
      localStorage.setItem("login" ,userName);
      fetchData(userName);

      console.log("calling externa")
      searchByFilter("ASSIGNEE");
    }
   
  }, []);

  const handleClear = () => {
    setAuditorNameValue("");
    setGroupNameValue("");
    setAuditStatus("");
    setAuditCaseAssignee("");
    setClaimProcessDateFrom("");
    setClaimProcessDateTo("");
    setExaminerNameValue("");
    setClaimType("");
    setPaidStatus("");
    setGreaterThanDollarAmount("");
  };

  const handleClickRow = (record, index, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (record?.auditStatus === AUDIT_STATUS_VALUE.open) {
      dispatch(getSelectedClaimByClaims(record));
    } else {
      dispatch(getClaimDetail(record.claimNumber));
    }
  };

  useEffect(() => {
    if (claims.length > 0 && !selectedClaims) {
      window.scrollTo(0, window.outerHeight + 500);
    }
  }, [claims, selectedClaims]);

  return (
    <Layout>
      <Tabs
        tabHandler={tabHandler}
        selectedTab ={tab}
        claimsData={props?.parentProps?.getClaims}
      />
      <div>&nbsp;</div>

      <ModalMessage
        actionHandler={(status) => dispatch(updateErrorMessage(status))}
        open={!!errorMessage}
        message={errorMessage}
        type="error"
      />

      <LoadingOverlay open={loading || loader} text="Fetching claims..." />
      {tabs.showAdvancedSearch && (
        <Form
          className="input-custom get-claim-form border p-2"
          style={{ marginBottom: "35px" }}
        >
          <FormGroup
            row
            style={{
              marginLeft: "5px",
              marginTop: "20px",
              paddingBottom: "30px",
            }}
          >
            <Row style={{ width: "90%" }}>
              <Col sm={4} style={{ paddingLeft: 25 }}>
                <Label
                  htmlFor="claimProcessDate"
                  className="text-left span-label"
                >
                  Processed Date From
                </Label>
                <Suspense fallback={<div>Loading...</div>}>
                  <DateSelector
                    name="processDateFrom"
                    id="processDateFrom"
                    defaultValue={claimProcessDateFrom}
                    onChangeHandler={setClaimProcessDateFrom}
                    invalid={isFormSubmitted && claimProcessDateFrom === ""}
                  />
                </Suspense>
              </Col>

              <Col sm={4}>
                <Label
                  htmlFor="claimProcessDate"
                  className="text-left  span-label"
                >
                  Processed Date To
                </Label>
                <Suspense fallback={<div>Loading...</div>}>
                  <DateSelector
                    name="processDateTo"
                    id="processDateTo"
                    defaultValue={claimProcessDateTo}
                    onChangeHandler={setClaimProcessDateTo}
                    invalid={isFormSubmitted && claimProcessDateTo === ""}
                  />
                </Suspense>
              </Col>

              <Col sm={4}>
                <Label for="auditStatus" className="text-left  span-label">
                  Audit Status
                </Label>
                <Suspense fallback={<div>Loading...</div>}>
                  <AutoSuggestDropDown
                    name="auditStatus"
                    placeholderVal="Audit status"
                    defaultValue={getOptionValue(
                      AUDIT_STATUS_OPTION,
                      auditStatus
                    )}
                    onChangeHandler={(e) =>
                      setAuditStatus(getLabelValue(AUDIT_STATUS_OPTION, e))
                    }
                    suggestionValue={AUDIT_STATUS_OPTION?.filter(option => option?.label !== 'CLOSED')}
                    hideIcon
                    style={
                      validationError.auditStatusError ? validationStyle : {}
                    }
                  />
                </Suspense>
              </Col>
            </Row>
            <Accordion
              title="more fields"
              noBorder
              headerStyle={{ marginLeft: "20px" }}
            >
              <Row style={{ width: "90%" }}>
                <Col sm={4}>
                  <Label
                    for="examinerName"
                    className="text-left span-label more-label"
                  >
                    Examiner
                  </Label>
                  <Suspense fallback={<div>Loading...</div>}>
                    <AutoSuggestDropDown
                      name="examinerName"
                      placeholderVal="Examiner"
                      defaultValue={examinerNameValue}
                      onChangeHandler={setExaminerNameValue}
                      suggestionValue={EXAMINER_NAME}
                      suggestions={EXAMINER_NAME}
                      hideIcon={true}
                      style={
                        validationError.examinerNameError ? validationStyle : {}
                      }
                    />
                  </Suspense>
                </Col>
                <Col sm={4}>
                  <Label
                    for="auditorName"
                    className="text-left  span-label more-label"
                  >
                    Auditor
                  </Label>
                  <Suspense fallback={<div>Loading...</div>}>
                    <AutoSuggestDropDown
                      name="auditorName"
                      placeholderVal="Auditor"
                      defaultValue={auditorNameValue}
                      onChangeHandler={setAuditorNameValue}
                      suggestionValue={AUDITOR_NAME}
                      suggestions={AUDITOR_NAME}
                      hideIcon={true}
                      style={
                        validationError.examinerNameError ? validationStyle : {}
                      }
                    />
                  </Suspense>
                </Col>

                <Col sm={4}>
                  <Label
                    for="auditCaseAssignee"
                    className="text-left  span-label more-label"
                  >
                    Assignee
                  </Label>
                  <Suspense fallback={<div>Loading...</div>}>
                    <AutoSuggestDropDown
                      name="auditCaseAssignee"
                      placeholderVal="Assignee"
                      defaultValue={getOptionValue(
                        ASSIGNEE_NAME,
                        auditCaseAssignee
                      )}
                      onChangeHandler={(e) =>
                        setAuditCaseAssignee(getLabelValue(ASSIGNEE_NAME, e))
                      }
                      suggestionValue={ASSIGNEE_NAME}
                      hideIcon
                      style={
                        validationError.assigneeError ? validationStyle : {}
                      }
                    />
                  </Suspense>
                </Col>

                <Col sm={4}>
                  <Label
                    for="groupName"
                    className="text-left  span-label more-label"
                  >
                    Group
                  </Label>
                  <Suspense fallback={<div>Loading...</div>}>
                    <AutoSuggestDropDown
                      name="groupName"
                      placeholderVal="Group"
                      defaultValue={groupNameValue}
                      onChangeHandler={setGroupNameValue}
                      suggestionValue={GROUP_NAME}
                      hideIcon={true}
                      style={
                        validationError.groupStatusError ? validationStyle : {}
                      }
                    />
                  </Suspense>
                </Col>

                <Col
                  sm={4}
                  style={{ display: "flex", paddingLeft: 0, paddingRight: 0 }}
                >
                  <Col sm={6}>
                    <Label
                      for="claimType"
                      className="text-left  span-label more-label"
                    >
                      Claim Type
                    </Label>
                    <Suspense fallback={<div>Loading...</div>}>
                      <AutoSuggestDropDown
                        name="claimType"
                        placeholderVal="Claim Type"
                        defaultValue={getOptionValue(CLAIM_TYPE, claimType)}
                        onChangeHandler={(e) =>
                          setClaimType(getLabelValue(CLAIM_TYPE, e))
                        }
                        suggestionValue={CLAIM_TYPE}
                        hideIcon
                        style={
                          validationError.claimTypeError ? validationStyle : {}
                        }
                      />
                    </Suspense>
                  </Col>
                  <Col sm={6}>
                    <Label
                      for="paidStatus"
                      className="text-left span-label more-label"
                    >
                      Claim Status
                    </Label>
                    <Suspense fallback={<div>Loading...</div>}>
                      <AutoSuggestDropDown
                        name="paidStatus"
                        placeholderVal="Claim Status"
                        defaultValue={paidStatus}
                        onChangeHandler={(e) => setPaidStatus(e ?? null)}
                        suggestionValue={PAID_STATUS}
                        hideIcon
                        style={
                          validationError.paidStatusError ? validationStyle : {}
                        }
                      />
                    </Suspense>
                  </Col>
                </Col>
                <Col sm={4}>
                  <Label
                    for="paidStatus"
                    className="text-left  span-label more-label"
                  >
                    Greater Than Dollar Amount
                  </Label>

                  <Input
                    type="number"
                    name="greaterThanDollarAmount"
                    id="greaterThanDollarAmount"
                    placeholder="Amount"
                    value={greaterThanDollarAmount}
                    onChange={(e) => setGreaterThanDollarAmount(e.target.value)}
                  />
                </Col>
              </Row>
            </Accordion>
            <div className="SearchButtonBox ">
              <LoadingButton
                style={{ marginRight: 10 }}
                onClick={handleClaimSearch}
                tabIndex="5"
                iconBefore={
                  <i
                    className="icon icon-search"
                    style={{ position: "unset" }}
                  />
                }
                appearance="primary"
                isLoading={loading || loader}
              >
                SEARCH
              </LoadingButton>

              <LoadingButton tabIndex="5" onClick={handleClear}>
                CLEAR
              </LoadingButton>
            </div>
          </FormGroup>
        </Form>
      )}

      {claims.length > 0 ? (
        <div>
          <div className="table-container table-responsive search custom-table-container">
            <Grid
              id="claimSearch"
              columns={CLAIM_GRID}
              data={claims}
              hoverable={true}
              justified={false}
              sortable={true}
              sortOrder={"asc"}
              useFixedHeader={true}
              rowKey={(record) => record.claimNumber}
              clientSidePagination={claims.length > 0 ? true : false}
              onRowClick={handleClickRow}
              calendarIcon={null}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        searchAction && (
          <Suspense fallback="Loading...">
            <MessageSection message="No Claim found!" />
          </Suspense>
        )
      )}
    </Layout>
  );
}

export default React.memo(GetClaims);
