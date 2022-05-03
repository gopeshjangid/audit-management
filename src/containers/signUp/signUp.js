import React, { Component } from "react";
import { connect } from "react-redux";
import SignupComponent from "../../components/signUp";
import Layout from "../../components/layout/layout";

class Signup extends Component {
 
  render() {
    return (
      <Layout>
       
        <SignupComponent {...this.props} />
      </Layout>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    claims: state.getClaims.claims,
    loading: state.getClaims.loading,
    searchError: state.getClaims.searchError,
    searchField: state.getClaims.searchField,
    selectedClaims: state.getClaims.selectedClaims,
  };
};

export default connect(mapStateToProps, null)(Signup);
