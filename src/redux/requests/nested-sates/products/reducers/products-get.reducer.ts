import { ProductsGetActionTypes } from '../actions';
import { initialState } from '../states';

export function productsRequests(state = initialState, action) {
  switch (action.type) {
    case ProductsGetActionTypes.REQUEST:
      return {
        loading: true,
        loaded: false,
        errors: null,
        data: null,
      };
    case ProductsGetActionTypes.REQUEST_SUCCESS:
    case ProductsGetActionTypes.REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        errors: action.payload.error,
        data: action.payload.data,
      };
    default:
      return state;
  }
}
