
import { push } from 'react-router-redux';
import { sendRequestObservable } from '../../../services/requestObservable'

import { ofType } from 'redux-observable'
import { concatMap, map, switchMap } from 'rxjs/operators'

import {
  ActionTypes,
  changeInvoiceFulfilled,
  deleteInvoiceFulfilled,
  getInvoiceByIdFulfilled,
  getInvoicesFulfilled,
  sendInvoicesFulfilled,
} from '../actions'

import { addInvoicesItems } from '../../invoiceItems/actions'

interface Ires {
  id?: number,
  customer_id?: string,
  discount?: string,
  total?: string,
}

export const getInvoicesEpic = (action$) => action$.pipe(
  ofType(ActionTypes.GET_INVOICES),
  switchMap(() =>
    sendRequestObservable('get', '/api/invoices').pipe(
      map((response) => getInvoicesFulfilled(response)),
    ),
  ),
);

export const getInvoiceByIdEpic = (action$) => action$.pipe(
  ofType(ActionTypes.GET_INVOICE_BY_ID),
  switchMap((action: any) =>
    sendRequestObservable('get', `/api/invoices/${action.payload.invoicesId}`).pipe(
      map((response) => getInvoiceByIdFulfilled(response)),
    ),
  ),
);

export const sendInvoicesEpic = (action$) => action$.pipe(
  ofType(ActionTypes.SEND_INVOICES),
  switchMap((action: any) =>
    sendRequestObservable('post', '/api/invoices', { ...action.payload.invoiceData }).pipe(
      concatMap((response: Ires) => {
        const invoiceId = response.id;
        const requests = [];
        const items = action.payload.itemsArr;
        requests.push(sendInvoicesFulfilled(response));
        items.forEach((el) => {
          requests.push(addInvoicesItems(invoiceId, el))
        });
        requests.push(push(`/invoices/`));
        return requests
      }),
    ),
  ),
);

export const changeInvoiceEpic = (action$) => action$.pipe(
  ofType(ActionTypes.CHANGE_INVOICE),
  switchMap((action: any) =>
    sendRequestObservable('put', `/api/invoices/${action.payload.id}`, {...action.payload.invoiceData}).pipe(
      map((response) => changeInvoiceFulfilled(response)),
    ),
  ),
);

export const deleteInvoiceEpic = (action$) => action$.pipe(
  ofType(ActionTypes.DELETE_INVOICE),
  switchMap((action: any) =>
    sendRequestObservable('delete', `/api/invoices/${action.payload.id}`).pipe(
      map((response) => deleteInvoiceFulfilled(response)),
    ),
  ),
);
