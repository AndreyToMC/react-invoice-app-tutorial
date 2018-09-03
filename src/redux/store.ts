import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import history from '../history';

import customers from './customers/reducers/customers.reducer';
import invoiceItems from './invoiceItems/reducers/invoiceItems.reducer';
import invoices from './invoices/reducers/invoices.reducer';
import products from './products/reducers/products.reducer';

// Создание группы редюсеров
const rootReducer = combineReducers({
  products,
  customers,
  invoiceItems,
  invoices,
  routing: routerReducer,
});

import * as customersEpics from './customers/epics'
import * as invoiceItemsEpics from './invoiceItems/epics'
import * as invoiceEpics from './invoices/epics'
import * as productsEpics from './products/epics'

// Создание группы эпиков
const rootEpic = combineEpics(
  productsEpics.getProductsEpic,
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
);

const epicMiddleware = createEpicMiddleware();

// Создание стора приложения на основе наших редьюсеров
function createMyStore() {
  const newStore = createStore(
    rootReducer,
    // Вспомогательная функция, которая подключает инструмент разработчика для редакс
    composeWithDevTools(
      // Подключение используемых мидлвееров, тут может быть подключен так же Redux-thunk или Redux-promises для работы с асинхронным кодом
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
