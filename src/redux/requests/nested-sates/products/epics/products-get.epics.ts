
import {getProducts} from '../../../../../services/productServices';
import { ProductsGetActionTypes } from '../actions';

import { ofType } from 'redux-observable'
import {catchError, map, switchMap} from 'rxjs/operators'

export const productsGetEpic = (action$) => action$.pipe(
  ofType(ProductsGetActionTypes.REQUEST),
  switchMap(() => {
    return getProducts().pipe(
      map((res: any) => ({
        type: res.response.error ? ProductsGetActionTypes.REQUEST_FAIL : ProductsGetActionTypes.REQUEST_SUCCESS,
        payload: res.response,
      })),
      catchError((res: any) => {
        return res
      }),
    )
  }),
);
