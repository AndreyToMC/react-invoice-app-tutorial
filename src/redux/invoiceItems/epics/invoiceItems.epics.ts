
import { sendRequestObservable } from '../../../services/requestObservable'

import { ofType } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'

import {
  ActionTypes,
  addInvoicesItemsFulfilled,
  changeInvoicesItemFulfilled,
  deleteInvoicesItemFulfilled,
  getInvoicesItemsFulfilled,
} from '../actions'

interface ItemRes {
  id: number,
  invoice_id: number,
  product_id: string,
  quantity: number,
}

export const getInvoicesItemsEpic = (action$) => action$.pipe(
  ofType(ActionTypes.GET_INVOICE_ITEMS),
  switchMap((action: any) =>
    sendRequestObservable(
      'get',
      `/api/invoices/${action.payload.invoicesId}/items`,
    ).pipe(
      map((response) => getInvoicesItemsFulfilled(response),
      ),
    ),
  ),
);

export const addInvoicesItemsEpic = (action$) => action$.pipe(
  ofType(ActionTypes.ADD_INVOICE_ITEM),
  switchMap((action: any) =>
    sendRequestObservable(
      'post',
      `/api/invoices/${action.payload.invoicesId}/items`,
      {...action.payload.data},
    ).pipe(
      map((response: ItemRes) => {
        const product_id = parseInt(response.product_id, 10)
        const item = {
          id: response.id,
          invoice_id: response.invoice_id,
          product_id,
          quantity: response.quantity,
        }
        return addInvoicesItemsFulfilled(item)
      }),
    ),
  ),
);

export const changeInvoicesItemEpic = (action$) => action$.pipe(
  ofType(ActionTypes.CHANGE_INVOICE_ITEM),
  switchMap((action: any) =>
    sendRequestObservable(
      'put',
      `/api/invoices/${action.payload.invoicesId}/items/${action.payload.id}`,
      {...action.payload.data},
    ).pipe(
      map((response: ItemRes) => {
        const product_id = parseInt(response.product_id, 10);
        const item = {
          id: response.id,
          invoice_id: response.invoice_id,
          product_id,
          quantity: response.quantity,
        };
        return changeInvoicesItemFulfilled(item)
      }),
    ),
  ),
);

export const deleteInvoicesItemEpic = (action$) => action$.pipe(
  ofType(ActionTypes.DELETE_INVOICE_ITEM),
  switchMap((action: any) =>
    sendRequestObservable(
      'delete',
      `/api/invoices/${action.payload.invoicesId}/items/${action.payload.id}`,
    ).pipe(
      map((response) => deleteInvoicesItemFulfilled(response)),
    ),
  ),
);
