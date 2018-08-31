
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import products from './products/reducers/products.reducer';

const rootReducer = combineReducers({
  products,
});

import * as productsEpics from './products/epics/products.epics'

const rootEpic = combineEpics(
  productsEpics.getProductsEpic,
);

const epicMiddleware = createEpicMiddleware();

function createMyStore() {
  const newStore = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        epicMiddleware,
      ),
    ),
  );
  epicMiddleware.run(rootEpic);

  return newStore;
}

export const store = createMyStore();
