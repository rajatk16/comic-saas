import {createContext, useReducer, useContext} from 'react';
import { CartReducer, sumItems } from '../reducers/cart';

const Context = createContext();
const initialState = {
  cart: [],
  ...sumItems([])
}

const Provider = ({children}) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addComic = payload => {
    dispatch({
      type: "ADD_COMIC",
      payload
    })
  }

  const removeComic = payload => {
    dispatch({
      type: "REMOVE_COMIC",
      payload
    })
  }

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART"
    })
  }

  const value = {
    addComic,
    removeComic,
    clearCart,
    ...state
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export const useCartState = () => useContext(Context);

export default Provider;