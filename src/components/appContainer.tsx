import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCustomers } from '../redux/customers/actions';
import { getInvoices } from '../redux/invoices/actions';
import { getProducts } from '../redux/products/actions';

import AppRouter from './appRouting';

interface IAppContainer {
  getCustomers: () => void,
  getProducts: () => void,
  getInvoices: () => void,
}

class AppContainer extends React.Component<IAppContainer> {
  componentDidMount() {
    this.props.getCustomers();
    this.props.getProducts();
    this.props.getInvoices();
  }

  render() {
    return (
        <AppRouter />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCustomers: bindActionCreators(getCustomers, dispatch),
    getInvoices: bindActionCreators(getInvoices, dispatch),
    getProducts: bindActionCreators(getProducts, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(AppContainer);
