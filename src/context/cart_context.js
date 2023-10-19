import reducer from '../reducer/cartReducer';
import { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();
const getLocalCartData = () => {
  let newCartData = localStorage.getItem('cartdata');
  if (newCartData?.length === 0 || newCartData === null) {
    return [];
  } else {
    return JSON.parse(newCartData);
  }
};
const initialState = {
  cart: getLocalCartData(),
  total_item: '',
  total_price: '',
  shipping_fee: 5000,
};
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addToCart = (id, color, amount, product, stock) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id, color, amount, product, stock },
    });
  };
  const setDecrease = (id) => {
    dispatch({ type: 'SET_DECREMENT', payload: { id } });
  };
  const setIncrease = (id, stock) => {
    dispatch({ type: 'SET_INCREMENT', payload: { id, stock } });
  };
  const removeCart = (id) => {
    dispatch({ type: 'REMOVE_CART', payload: { id } });
  };
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  useEffect(() => {
    dispatch({ type: 'CART_PRICE' });
    localStorage.setItem('cartdata', JSON.stringify(state?.cart));
  }, [state?.cart]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeCart,
        clearCart,
        setDecrease,
        setIncrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};
export { CartProvider, useCartContext };
