import * as React from 'react';

import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import AddInvoicePage from './addInvoicePage/addInvoicePageContainer'
import CustomersPageContainer from './customersPage/customersPageContainer'
import InvoicePageContainer from './invoiceList/invoicePageContainer'
import MainPageContainer from './invoiceList/mainPageContainer'
import ProductsPageContainer from './productsPage/productsPageContainer'

import history from '../history';
import Header from './header';

class AppRouter extends React.Component {
  render() {
    return (
      <ConnectedRouter history={history}>
          <div>
            <Header />
            <Route exact={true} path='/' component={MainPageContainer} />
            <Route exact={true} path='/invoices' component={InvoicePageContainer} />
            <Route path='/add_invoice' component={AddInvoicePage} />
            <Route path='/products' component={ProductsPageContainer} />
            <Route path='/customers' component={CustomersPageContainer} />
          </div>
      </ConnectedRouter>
    );
  }
}

export default AppRouter;
