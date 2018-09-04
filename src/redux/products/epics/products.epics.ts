import {apiUrl} from '../../../consts/apiUrl'
import { normalizeData } from '../../../services/normalizeData'

import * as productRequest from '../../requests/nested-sates/products/actions'

import { ofType } from 'redux-observable'
import { map } from 'rxjs/operators'

import {ActionTypes, setProducts} from '../actions'

export const getProductsEpic = (action$) => action$.pipe(
  ofType(ActionTypes.GET_PRODUCTS),
  map(() => ({
    type: productRequest.ProductsGetActionTypes.REQUEST,
  })),
);

export const setProductsEpic = (action$) => action$.pipe(
  ofType(productRequest.ProductsGetActionTypes.REQUEST_SUCCESS),
  map((action: any) => normalizeData(action.payload, ['name', 'price'])),
  map((data: any) => setProducts({
    productsList: data.arr,
    productsPriceById: data.objByType.price,
    productsNameById: data.objByType.name,
  })),
);
