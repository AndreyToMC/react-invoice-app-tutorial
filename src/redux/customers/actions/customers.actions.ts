export const ActionTypes = {
  GET_CUSTOMERS: 'customers/GET_CUSTOMERS',
  GET_CUSTOMERS_FULFILLED: 'customers/GET_CUSTOMERS_FULFILLED',
};

export const getCustomers = () => ({ type: ActionTypes.GET_CUSTOMERS });
export const getCustomersFulfilled = (payload) => ({ type: ActionTypes.GET_CUSTOMERS_FULFILLED, payload });
