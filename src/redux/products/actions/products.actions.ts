
// для удобства прописываем экшн тайпы в константу
export const ActionTypes = {
  GET_PRODUCTS: 'products/GET_PRODUCTS',
  GET_PRODUCTS_FULFILLED: 'products/GET_PRODUCTS_FULFILLED',
};

// Непосредственно экшн криеторы
// Могут содержать в себе как просто экшн тайп, так и пайлоад, в который пробрасываем данные, с которыми будем работать в дальнейшем
// если нужно положить уже известную информацию в стор - достаточно одного экшена,
// но в нашем случае - запрос к базе может завершится ошибкой
// по этому по удачному завершению запроса мы выполняем getProductsFulfilled с данными которые полуили от сервера
export const getProducts = () => ({ type: ActionTypes.GET_PRODUCTS});
export const getProductsFulfilled = (payload) => ({ type: ActionTypes.GET_PRODUCTS_FULFILLED, payload });
