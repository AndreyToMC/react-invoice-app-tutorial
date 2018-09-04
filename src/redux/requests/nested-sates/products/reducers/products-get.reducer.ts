import { ProductsGetActionTypes } from '../actions';
import { initialState } from '../states';

export function reducer(state = initialState, action) {
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
      // return {
      //   ...state,
      //   loading: false,
      //   loaded: true,
      //   errors: action.payload.errors,
      //   data: action.payload.data,
      // };
    default:
      return state;
  }
}
