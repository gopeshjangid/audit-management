import React, { Component } from "react";
import { connect } from "react-redux";
import ReportComponent from "../../components/reports";
import {  } from "../../actions";
import { clearSearchReportDetails, clearAllReportsData } from "../../actions/action.reports";
class Reports extends Component {
   
  componentDidMount(){
    this.props.clearAllReportsData();
    this.props.clearSearchReportDetails();
  }
  render() {
    return (<ReportComponent parentProps={this.props} />);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {clearAllReportsData : () =>dispatch(clearAllReportsData()),
    clearSearchReportDetails:()=>dispatch(clearSearchReportDetails())};
};

const mapStateToProps = (state) => {
  return {
    loading: state.report.loading,
    searchError: state.report.searchError,
    searchField: state.report.searchField,
    report: state.report.report,
    AUDITOR_NAME: state.masterTable.auditorNames,
    EXAMINER_NAME: state.masterTable.examinerNames,
    GROUP_NAME: state.masterTable.groupNames,
    PAID_STATUS: state.masterTable.claimStatus,
    CLAIM_TYPE: state.masterTable.claimTypes
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
