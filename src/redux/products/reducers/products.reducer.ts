import { ActionTypes } from '../actions';
import { initialState } from '../states';

const products = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      const productsData = {...action.payload};
      return {...productsData};
    default:
      return state;
  }
};

export default products;
