import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClaimDetailComponent from '../../components/claimDetail';

class ClaimDetail extends Component {
  render() {
    return (<ClaimDetailComponent parentProps={this.props}  />)
  }
}

const mapDispatchToProps = dispatch => {};

const mapStateToProps = state => {
  return {
    claim: state.getClaims.selectedClaims,
    loading: state.getClaims.loading,
    searchError: state.getClaims.searchError
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimDetail);
