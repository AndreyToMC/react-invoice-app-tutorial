import * as React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { deleteInvoice } from '../../redux/invoices/actions'

import InvoicePage from './invoiceTab';

interface IInvoicePageContainer {
  push: (url: string) => void,
  deleteInvoice: (url: string) => void,
  invoices: [],
  customersNameById: [],
}

class InvoicePageContainer extends React.Component<IInvoicePageContainer> {
  toInvoice = (e) => {
    const invoiceId = e.target.parentNode.id;
    this.props.push(`/invoices/${invoiceId}`)
  };
  toEditInvoice = (e) => {
  const invoiceId = e.target.parentNode.id;
  this.props.push(`/invoices_edit/${invoiceId}`)
  };
  toDeleteInvoice = (e) => {
    this.props.deleteInvoice(e.target.parentNode.id)
  };
  render() {
    return (
      <InvoicePage
        invoicePage={true}
        toInvoice={this.toInvoice}
        toEditInvoice={this.toEditInvoice}
        toDeleteInvoice={this.toDeleteInvoice}
        invoices={this.props.invoices}
        customersNames={this.props.customersNameById}
      />
    );
  }
}

function mapStateToProps(state) {
  return { invoices: state.invoices.invoicesList, customersNameById: state.customers.customersNameById };
}
function mapDispatchToProps(dispatch) {
  return {
    deleteInvoice: bindActionCreators(deleteInvoice, dispatch),
    push: bindActionCreators(push, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoicePageContainer);
