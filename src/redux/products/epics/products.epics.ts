
import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax';
import { map, switchMap } from 'rxjs/operators'

import {ActionTypes, getProductsFulfilled} from '../actions/products.actions'

export const getProductsEpic = (action$) => action$.pipe(
  ofType(ActionTypes.GET_PRODUCTS),
  switchMap(() =>
    ajax.get(`/api/products`).pipe(
      map((res: any) => getProductsFulfilled(res)),
    ),
  ),
);
