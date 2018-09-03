import * as _ from 'lodash';

import { ActionTypes } from '../actions';
import { initialState } from '../states';

const invoiceItems = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_INVOICE_ITEMS_FULFILLED:
      const invoiceItemsArr = action.payload;
      return [...invoiceItemsArr];
    case ActionTypes.ADD_INVOICE_ITEM_FULFILLED:
      const invoiceItem = action.payload;
      return [...state, invoiceItem];
    case ActionTypes.CHANGE_INVOICE_ITEM_FULFILLED:
      const newItem = action.payload;
      const index = _.findIndex(state, (o) => o.id === newItem.id);
      const newItemList = _.fill(state, newItem, index, index + 1);
      return [...newItemList];
    case ActionTypes.DELETE_INVOICE_ITEM_FULFILLED:
      return state;
    default:
      return state;
  }
};

export default invoiceItems;
