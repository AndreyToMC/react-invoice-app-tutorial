import {apiUrl} from '../../../consts/apiUrl'
import { normalizeData } from '../../../services/normalizeData'
import { sendRequestObservable } from '../../../services/requestObservable'

import { ofType } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'

import {ActionTypes, getProductsFulfilled} from '../actions/products.actions'

export const getProductsEpic = (action$) => action$.pipe(
  ofType(ActionTypes.GET_PRODUCTS),
  switchMap(() =>
    // отправка через общую функцию для запросов
    sendRequestObservable('get', `/api/products`).pipe(
      // создание двух обьектов с полями id и name, id и price
      map((response) => normalizeData(response, ['name', 'price'])),
      map((data: any) => getProductsFulfilled({
        productsList: data.arr,
        productsPriceById: data.objByType.price,
        productsNameById: data.objByType.name,
      })),
    ),
  ),
);
