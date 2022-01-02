export const sumItems = cart => {
  let itemCount = cart.reduce((total, comic) => total + comic.quantity, 0);
  let total = cart.reduce((total, comic) => total + comic.price * comic.quantity, 0).toFixed(2);
  return {
    itemCount,
    total
  }
}

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMIC": 
      if (!state.cart.find(comic => comic.id === action.payload.id)) {
        state.cart.push({
          ...action.payload,
          quantity: 1
        })
      }
      return {
        ...state,
        ...sumItems(state.cart),
        cart: [
          ...state.cart
        ]
      }
    case 'REMOVE_COMIC': 
      return {
        ...state,
        ...sumItems(state.cart.filter(comic => comic.id !== action.payload.id)),
        cart: [
          ...state.cart.filter(comic => comic.id !== action.payload.id)
        ]
      }
    case "CLEAR_CART": 
      return {
        cart: [],
        ...sumItems([])
      }
    default:
      return state
  }
}