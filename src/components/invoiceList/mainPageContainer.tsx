import * as React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import MainPage from './invoiceTab';

interface IMainPageContainer {
  push: (url: string) => void,
  invoices: [],
  customersNameById: [],
}
class MainPageContainer extends React.Component<IMainPageContainer> {
  toInvoice = (e) => {
    const invoiceId = e.target.parentNode.id;
    this.props.push(`/invoices/${invoiceId}`)
  };
  render() {
    return (
      <MainPage toInvoice={this.toInvoice} invoices={this.props.invoices} customersNames={this.props.customersNameById}/>
    );
  }
}

function mapStateToProps(state) {
  return { invoices: state.invoices.invoicesList, customersNameById: state.customers.customersNameById };
}
function mapDispatchToProps(dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPageContainer);
