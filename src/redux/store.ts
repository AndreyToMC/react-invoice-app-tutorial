import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import history from '../history';

import customers from './customers/reducers/customers.reducer';
import invoiceItems from './invoiceItems/reducers/invoiceItems.reducer';
import invoices from './invoices/reducers/invoices.reducer';
import products from './products/reducers/products.reducer';
import {reducer} from './requests/nested-sates/products/reducers'

const rootReducer = combineReducers({
  products,
  customers,
  invoiceItems,
  invoices,
  reducer,
  routing: routerReducer,
});

import * as customersEpics from './customers/epics'
import * as invoiceItemsEpics from './invoiceItems/epics'
import * as invoiceEpics from './invoices/epics'
import * as productsEpics from './products/epics'
import * as requestProductEpics from './requests/nested-sates/products/epics'

const rootEpic = combineEpics(
  productsEpics.getProductsEpic,
  productsEpics.setProductsEpic,
  customersEpics.getCustomersEpic,
  invoiceItemsEpics.getInvoicesItemsEpic,
  invoiceItemsEpics.addInvoicesItemsEpic,
  invoiceItemsEpics.changeInvoicesItemEpic,
  invoiceItemsEpics.deleteInvoicesItemEpic,
  invoiceEpics.getInvoicesEpic,
  invoiceEpics.getInvoiceByIdEpic,
  invoiceEpics.sendInvoicesEpic,
  invoiceEpics.changeInvoiceEpic,
  invoiceEpics.deleteInvoiceEpic,
  requestProductEpics.productsGetEpic,
);

const epicMiddleware = createEpicMiddleware();

function createMyStore() {
  const newStore = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        epicMiddleware,
        routerMiddleware(history),
      ),
    ),
  );
  epicMiddleware.run(rootEpic);

  return newStore;
}

export const store = createMyStore();
