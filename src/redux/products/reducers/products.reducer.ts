import { ActionTypes } from '../actions/products.actions';
import { initialState } from '../states';

const products = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_FULFILLED:
      const productsList = action.payload;
      const newState = {...state};
      newState.productsList = productsList;
      return {...newState};
    default:
      return state;
  }
};

export default products;
