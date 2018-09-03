import * as React from 'react';

import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import AddInvoicePage from './addInvoicePage/addInvoicePageContainer'

import history from '../history';
import Header from './header';

class AppRouter extends React.Component {
  render() {
    return (
      <ConnectedRouter history={history}>
          <div>
            <Header />
            <Route path='/add_invoice' component={AddInvoicePage} />
          </div>
      </ConnectedRouter>
    );
  }
}

export default AppRouter;
