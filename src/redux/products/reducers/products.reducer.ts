import { ActionTypes } from '../actions/products.actions';
import { initialState } from '../states';

const products = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_FULFILLED:
      const productsData = {...action.payload};
      return {...productsData};
    default:
      return state;
  }
};

export default products;
