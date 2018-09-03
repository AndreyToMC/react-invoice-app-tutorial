import * as React from 'react';
import { connect } from 'react-redux';

import CustomersPage from './customersPage';

interface InterfaceCustomersPage {
  customers: [],
}

class CustomersPageContainer extends React.Component<InterfaceCustomersPage> {
  render() {
    return (
      <CustomersPage customers={this.props.customers} />
    );
  }
}

function mapStateToProps(state) {
  return { customers: state.customers.customersList };
}

export default connect(
  mapStateToProps,
)(CustomersPageContainer);
