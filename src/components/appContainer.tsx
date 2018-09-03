import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCustomers } from '../redux/customers/actions';
import { getProducts } from '../redux/products/actions';

import AppRouter from './appRouting';

interface IAppContainer {
  getCustomers: () => void,
  getProducts: () => void,
}

class AppContainer extends React.Component<IAppContainer> {
  componentDidMount() {
    this.props.getCustomers();
    this.props.getProducts();
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
    getProducts: bindActionCreators(getProducts, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(AppContainer);
