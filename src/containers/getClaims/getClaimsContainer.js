import React, { PureComponent } from "react";
import { connect } from "react-redux";
import GetClaimsComponent from "../../components/getClaims";
import ClaimDetail from "../../components/claimDetail";
import { clearReducer } from "../../actions/action.getClaims";

class GetClaims extends PureComponent {
  componentDidMount() {
    this.props.clearReducer();
  }
  render() {

    console.log("this.props.selectedClaims===" ,this.props.selectedClaims)
    return this.props.selectedClaims ? (
      <ClaimDetail parentProps={this.props} />
    ) : (
      <GetClaimsComponent parentProps={this.props} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {clearReducer : () =>dispatch(clearReducer())};
};

const mapStateToProps = (state) => {
  return {
    ...state,
    claims: state.getClaims.claims,
    loading: state.getClaims.loading,
    searchError: state.getClaims.searchError,
    searchField: state.getClaims.searchField,
    selectedClaims: state.getClaims.selectedClaims,
    categoriesSubCategories: state.masterTable.categoriesSubCategories,
    assigneName: state.masterTable.allUser,
    ASSIGNEE_NAME: state.masterTable.allUser,
    GROUP_NAME: state.masterTable.groupNames,
    EXAMINER_NAME: state.masterTable.examinerNames,
    CLAIM_TYPE: state.masterTable.claimTypes,
    AUDIT_STATUS_OPTION: state.masterTable.auditStatus,
    PAID_STATUS: state.masterTable.claimStatus,
    AUDITOR_NAME: state.masterTable.auditorNames,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetClaims);
