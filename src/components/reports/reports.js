import React, { useState, useRef, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { Form, FormGroup, Col, Label, Button, Alert, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import moment from "moment";
import Layout from "../layout/layout";
import { REPORT_GRID } from "../../constants/constant.gridColums";
import ExportExcel from "./exportExcel";
import { serviceAPI } from "../../services/service.api";
import { getAuditReportBySearch , updateExaminerAuditorName} from "../../actions";
import Grid from "../Grid";
import "./scss/reports.scss";
import AutoSuggestDropDown from "../autoSuggestDropDown/autoSuggestDropDown";
import { getOptionValue, getLabelValue, checkValueIsExist } from "../../helpers/utility";
import DateSelector from "../dateSelector/dateSelector";
import DownloadIcon from "@atlaskit/icon/glyph/download";

function Reports(props) {
  const dispatch = useDispatch();
  const validationStyle = { border: "2px solid red" };
  const { report, loading, GROUP_NAME, EXAMINER_NAME, CLAIM_TYPE, PAID_STATUS, AUDITOR_NAME, searchError, searchField } = props.parentProps;
  const [searchErrorVal, setSearchErrorVal] = useState(searchError ? true : false);
  const [groupNameValue, setGroupNameValue] = useState(searchField.groupName);
  const [examinerNameValue, setExaminerNameValue] = useState(searchField.examinerName || "");
  const [auditorNameValue, setAuditorNameValue] = useState(searchField.auditor || "");
  const messagesEndRef = useRef(null);
  const [claimProcessDateFrom, setClaimProcessDateFrom] = useState(searchField.claimProcessStartDate ? moment(searchField.claimProcessStartDate).format("MM/DD/YYYY"): "");
  const [claimProcessDateTo, setClaimProcessDateTo] = useState(searchField.claimProcessEndDate ? moment(searchField.claimProcessEndDate).format("MM/DD/YYYY"): "");
  const [claimType, setClaimType] = useState(searchField.claimType);
  const [paidStatus, setPaidStatus] = useState(searchField.claimStatus);
  const [greaterThanDollarAmount, setGreaterThanDollarAmount] = useState(searchField.greaterThanDollarAmount);
  const [validMessage, setValidMessage] = useState(null);
  const [validationError, setValidationError] = useState({
    auditStatusError: false,
    groupStatusError: false,
    examinerNameError: false,
    auditorNameError: false,
    claimTypeError: false,
    paidStatusError: false,
    assigneeError: false,
  });
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const checkSearchKeyExist = (searchValues) => {
    const groupStatusError = searchValues.groupName ? checkValueIsExist(GROUP_NAME, searchValues.groupName): false;
    const examinerNameError = searchValues.examinerName ? checkValueIsExist(EXAMINER_NAME, searchValues.examinerName) : false;
    const paidStatusError = searchValues.paidStatus ? checkValueIsExist(PAID_STATUS, searchValues.paidStatus) : false;
    const claimTypeError = searchValues.claimType ? checkValueIsExist(CLAIM_TYPE, searchValues.claimType) : false;
    const auditorNameError = searchValues.auditor ? checkValueIsExist(AUDITOR_NAME, searchValues.auditor) : false;
    setValidationError({
      groupStatusError,
      examinerNameError,
      claimTypeError,
      paidStatusError,
      auditorNameError
    });

    return (groupStatusError || examinerNameError || paidStatusError || claimTypeError || auditorNameError);
  };

  const handleClaimSearch = () => {
    const searchObject = {
      groupName: groupNameValue,
      examinerName: examinerNameValue,
      claimProcessStartDate: claimProcessDateFrom ? moment(claimProcessDateFrom).format("YYYY-MM-DD") : "",
      claimProcessEndDate: claimProcessDateTo ? moment(claimProcessDateTo).format("YYYY-MM-DD") : "",
      claimType: claimType,
      claimStatus: paidStatus,
      greaterThanDollarAmount: greaterThanDollarAmount,
      auditor: auditorNameValue
    };
    const isValid = checkSearchKeyExist(searchObject);
    if (!isValid) {
      if (claimProcessDateFrom && claimProcessDateTo) {
        setValidMessage(null);
        dispatch(getAuditReportBySearch(searchObject));
      } else {
        setValidMessage("Please fill Claim Process from and to date");
        setSearchErrorVal(false);
      }
    } else {
      setValidMessage("Please fill valid options.");
    }
  };

  useEffect(() => {
    if(PAID_STATUS === undefined|| PAID_STATUS.length === 0){
      serviceAPI.getConfigApi().then(res=>{
        const users = res.data;
        dispatch(updateExaminerAuditorName(users));
      }).catch(err =>{
        console.log(err);
      });
    }
  }, []);
  
  useEffect(() => {
    if (report.length > 0 ) {
      scrollToBottom();
    }
  }, [report]);

  useEffect(() => {
    if (searchError) {
      setSearchErrorVal(validMessage ? false : true);
    } else {
      setSearchErrorVal(false);
    }
  }, [searchError, validMessage]);
  console.log("report" ,report)
  return (
    <Layout>
      {searchErrorVal && <Alert color="danger">{searchError}</Alert>}
      {validMessage && <Alert color="danger">{validMessage}</Alert>}
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
          <div className="selectDropDownbox">
            <Label
              htmlFor="claimProcessDate"
              className="text-right text-box "
            >
               Process Date From
            </Label>
            <Col sm="6">
              <DateSelector
                name="processDateFrom"
                id="processDateFrom"
                defaultValue={claimProcessDateFrom}
                onChangeHandler={setClaimProcessDateFrom}
              />
            </Col>
          </div>

          <div className="selectDropDownbox">
            <Label
              htmlFor="claimProcessDate"
              className="text-right text-box"
            >
               Process Date To
            </Label>
            <Col sm="6">
              <DateSelector
                name="processDateTo"
                id="processDateTo"
                defaultValue={claimProcessDateTo}
                onChangeHandler={setClaimProcessDateTo}
              />
            </Col>
          </div>
          <div className="selectDropDownbox">
            <Label for="groupName" className="text-right text-box">
              Group Name
            </Label>
            <Col sm="6">
              <AutoSuggestDropDown
                name="groupName"
                placeholderVal="Group Name"
                defaultValue={groupNameValue}
                onChangeHandler={setGroupNameValue}
                suggestionValue={GROUP_NAME}
                hideIcon={true}
                style={validationError.groupStatusError ? validationStyle : {}}
              />
            </Col>
          </div>

          <div className="selectDropDownbox">
            <Label for="examinerName" className="text-right text-box">
              Examiner Name
            </Label>
            <Col sm="6">
              <AutoSuggestDropDown
                name="examinerName"
                placeholderVal="Examiner Name"
                defaultValue={examinerNameValue}
                onChangeHandler={setExaminerNameValue}
                suggestionValue={EXAMINER_NAME}
                suggestions={EXAMINER_NAME}
                hideIcon={true}
                style={validationError.examinerNameError ? validationStyle : {}}
              />
            </Col>
          </div>

          <div className="selectDropDownbox">
            <Label for="paidStatus" className="text-right text-box">
              Greater Than Dollar Amount
            </Label>
            <Col sm="6">
              <Input
                type="number"
                name="greaterThanDollarAmount"
                id="greaterThanDollarAmount"
                placeholder="Amount"
                value={greaterThanDollarAmount}
                onChange={(e) => setGreaterThanDollarAmount(e.target.value)}
              />
            </Col>
          </div>

          <div className="selectDropDownbox">
            <Label for="auditorName" className="text-right text-box">
              Auditor Name
            </Label>
            <Col sm="6">
              <AutoSuggestDropDown
                name="auditorName"
                placeholderVal="Auditor Name"
                defaultValue={auditorNameValue}
                onChangeHandler={setAuditorNameValue}
                suggestionValue={AUDITOR_NAME}
                suggestions={AUDITOR_NAME}
                hideIcon={true}
                style={validationError.examinerNameError ? validationStyle : {}}
              />
            </Col>
          </div>

          <div className="selectDropDownbox">
            <Label for="claimType" className="text-right text-box">
              Claim Type
            </Label>
            <Col sm="6">
              <AutoSuggestDropDown
                name="claimType"
                placeholderVal="Claim Type"
                defaultValue={getOptionValue(CLAIM_TYPE, claimType)}
                onChangeHandler={(e) => setClaimType(getLabelValue(CLAIM_TYPE, e))}
                suggestionValue={CLAIM_TYPE}
                hideIcon
                style={validationError.claimTypeError ? validationStyle : {}}
              />
            </Col>
          </div>

          <div className="selectDropDownbox">
            <Label for="paidStatus" className="text-right text-box">
              Claim Status
            </Label>
            <Col sm="6">
              <AutoSuggestDropDown
                name="paidStatus"
                placeholderVal="Claim Status"
                defaultValue={paidStatus}
                onChangeHandler={(e) => setPaidStatus(e ?? null)}
                suggestionValue={PAID_STATUS}
                hideIcon
                style={validationError.paidStatusError ? validationStyle : {}}
              />
            </Col>
          </div>
        </FormGroup>
        <div className="selectDropDownbox customButton">
          <Button
            type="button"
            color="info"
            className="custom-round-btn"
            onClick={handleClaimSearch}
            tabIndex="5"
            style={{ marginRight: "10px" }}
          >
            <i className="icon icon-search" style={{ position: "unset" }} />
            SEARCH
          </Button>
        </div>
      </Form>
      <div className={`text-center ${loading ? "custom-Loader" : ""}`}>
        <ClipLoader loading={loading} />
      </div>
      {report?.length > 0 &&
          <div className="export-container">
            <ExportExcel className="exportIcon" memberReportList={report?.map(row => ({...row ,errorCount : !row?.errorCount ? 0 : row?.errorCount}))}>
              <span className="downloadIcon"><DownloadIcon className='downloadIcon' /></span>
            </ExportExcel>
          </div>
      }
          
      {report.length > 0 && (
        <div>
          <div className="table-container table-responsive search custom-table-container">
            <Grid
              id="claimSearch"
              columns={REPORT_GRID}
              data={report}
              hoverable={true}
              justified={false}
              sortable={true}
              sortOrder={"asc"}
              useFixedHeader={true}
              rowKey={(record) => record.claimNumber}
              clientSidePagination={report.length > 0 ? true : false}
              onRowClick={() => {}}
              calendarIcon={null}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Reports;
