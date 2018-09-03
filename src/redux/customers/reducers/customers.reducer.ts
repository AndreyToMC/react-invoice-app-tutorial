import { ActionTypes } from '../actions';
import { initialState } from '../states';

const customers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CUSTOMERS_FULFILLED:
      return { ...action.payload };
    default:
      return state;
  }
};

export default customers;
