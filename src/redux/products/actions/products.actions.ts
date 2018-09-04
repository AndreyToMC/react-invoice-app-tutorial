
export const ActionTypes = {
  GET_PRODUCTS: 'products/GET_PRODUCTS',
  SET_PRODUCTS: 'products/SET_PRODUCTS',
};

export const getProducts = () => ({ type: ActionTypes.GET_PRODUCTS});
export const setProducts = (payload) => ({ type: ActionTypes.SET_PRODUCTS, payload });
