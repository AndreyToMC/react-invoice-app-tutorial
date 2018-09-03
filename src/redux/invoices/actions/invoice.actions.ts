export const ActionTypes = {
  GET_INVOICES: 'invoice/GET_INVOICES',
  GET_INVOICES_FULFILLED: 'invoice/GET_INVOICES_FULFILLED',
  GET_INVOICE_BY_ID: 'invoice/GET_INVOICE_BY_ID',
  GET_INVOICE_BY_ID_FULFILLED: 'invoice/GET_INVOICE_BY_ID_FULFILLED',
  SEND_INVOICES: 'invoice/SEND_INVOICES',
  SEND_INVOICES_FULFILLED: 'invoice/SEND_INVOICES_FULFILLED',
  CHANGE_INVOICE: 'invoice/CHANGE_INVOICE',
  CHANGE_INVOICE_FULFILLED: 'invoice/CHANGE_INVOICE_FULFILLED',
  DELETE_INVOICE: 'invoice/DELETE_INVOICE',
  DELETE_INVOICE_FULFILLED: 'invoice/DELETE_INVOICE_FULFILLED',
};

export const getInvoices = () => ({ type: ActionTypes.GET_INVOICES });
export const getInvoicesFulfilled = (payload) => ({ type: ActionTypes.GET_INVOICES_FULFILLED, payload });

export const getInvoiceById = (invoicesId) => ({ type: ActionTypes.GET_INVOICE_BY_ID, payload: {invoicesId} });
export const getInvoiceByIdFulfilled = (payload) => ({ type: ActionTypes.GET_INVOICE_BY_ID_FULFILLED, payload });

export const sendInvoices = (invoiceData, itemsArr) => ({ type: ActionTypes.SEND_INVOICES, payload: {invoiceData, itemsArr} });
export const sendInvoicesFulfilled = (payload) => ({ type: ActionTypes.SEND_INVOICES_FULFILLED, payload });

export const changeInvoice = (id, invoiceData) => ({ type: ActionTypes.CHANGE_INVOICE, payload: {id, invoiceData} });
export const changeInvoiceFulfilled = (payload) => ({ type: ActionTypes.CHANGE_INVOICE_FULFILLED, payload });

export const deleteInvoice = (id) => ({ type: ActionTypes.DELETE_INVOICE, payload: {id} });
export const deleteInvoiceFulfilled = (payload) => ({ type: ActionTypes.DELETE_INVOICE_FULFILLED, payload });
