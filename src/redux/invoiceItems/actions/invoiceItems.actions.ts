export const ActionTypes = {
  GET_INVOICE_ITEMS: 'invoiceItems/GET_INVOICE_ITEMS',
  GET_INVOICE_ITEMS_FULFILLED: 'invoiceItems/GET_INVOICE_ITEMS_FULFILLED',
  ADD_INVOICE_ITEM: 'invoiceItems/ADD_INVOICE_ITEM',
  ADD_INVOICE_ITEM_FULFILLED: 'invoiceItems/ADD_INVOICE_ITEM_FULFILLED',
  CHANGE_INVOICE_ITEM: 'invoiceItems/CHANGE_INVOICE_ITEM',
  CHANGE_INVOICE_ITEM_FULFILLED: 'invoiceItems/CHANGE_INVOICE_ITEM_FULFILLED',
  DELETE_INVOICE_ITEM: 'invoiceItems/DELETE_INVOICE_ITEM',
  DELETE_INVOICE_ITEM_FULFILLED: 'invoiceItems/DELETE_INVOICE_ITEM_FULFILLED',
};

export const getInvoicesItems = (invoicesId) => ({ type: ActionTypes.GET_INVOICE_ITEMS, payload: {invoicesId} });
export const getInvoicesItemsFulfilled = (payload) => ({ type: ActionTypes.GET_INVOICE_ITEMS_FULFILLED, payload });

export const addInvoicesItems = (invoicesId, data) => ({ type: ActionTypes.ADD_INVOICE_ITEM, payload: {invoicesId, data} });
export const addInvoicesItemsFulfilled = (payload) => ({ type: ActionTypes.ADD_INVOICE_ITEM_FULFILLED, payload });

export const changeInvoicesItem = (invoicesId, data, id) => ({ type: ActionTypes.CHANGE_INVOICE_ITEM, payload: {invoicesId, data, id} });
export const changeInvoicesItemFulfilled = (payload) => ({ type: ActionTypes.CHANGE_INVOICE_ITEM_FULFILLED, payload });

export const deleteInvoicesItem = (invoicesId, id) => ({ type: ActionTypes.DELETE_INVOICE_ITEM, payload: {invoicesId, id} });
export const deleteInvoicesItemFulfilled = (payload) => ({ type: ActionTypes.DELETE_INVOICE_ITEM_FULFILLED, payload });
