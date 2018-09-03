
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import customers from './customers/reducers/customers.reducer';
import products from './products/reducers/products.reducer';

// Создание группы редюсеров
const rootReducer = combineReducers({
  products,
  customers,
});

import * as customersEpics from './customers/epics'
import * as productsEpics from './products/epics/products.epics'

// Создание группы эпиков
const rootEpic = combineEpics(
  productsEpics.getProductsEpic,
  customersEpics.getCustomersEpic,
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
      ),
    ),
  );
  epicMiddleware.run(rootEpic);

  return newStore;
}

export const store = createMyStore();
