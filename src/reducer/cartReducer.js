const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      let { id, color, amount, product, stock } = action.payload;
      let existingProduct = state?.cart?.find(
        (item) => item?.id === id + color
      );
      if (existingProduct) {
        let updatedProduct = state?.cart?.map((item) => {
          if (item.id === id + color) {
            let newAmount = item?.amount + amount;
            if (newAmount > stock) {
              return {
                ...item,
                amount: stock,
              };
            } else {
              return {
                ...item,
                amount: newAmount,
              };
            }
          } else {
            return item;
          }
        });
        return { ...state, cart: updatedProduct };
      } else {
        let cartProduct = {
          id: id + color,
          name: product?.name,
          color,
          amount,
          image: product?.image[0].url,
          price: product?.price,
          max: product?.stock,
        };
        return { ...state, cart: [...state.cart, cartProduct] };
      }
    case 'SET_INCREMENT':
      const updatedAmounts = state?.cart?.map((item) => {
        if (item?.id === action.payload.id) {
          if (item?.amount >= action.payload.stock) {
            return { ...item, amount: action.payload.stock };
          }
          return { ...item, amount: item?.amount + 1 };
        } else {
          return item;
        }
      });
      return { ...state, cart: updatedAmounts };
    case 'SET_DECREMENT':
      const updatedAmount = state?.cart?.map((item) => {
        if (item?.id === action.payload.id) {
          if (item?.amount <= 1) {
            return { ...item, amount: 1 };
          }
          return { ...item, amount: item?.amount - 1 };
        } else {
          return item;
        }
      });
      return { ...state, cart: updatedAmount };
    case 'CART_PRICE':
      let { total_item, total_price } = state.cart.reduce(
        (acc, item) => {
          let { price, amount } = item;
          acc.total_item += amount;
          acc.total_price += amount * price;
          return acc;
        },
        {
          total_item: 0,
          total_price: 0,
        }
      );
      return { ...state, total_item, total_price };
    case 'REMOVE_CART':
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cart: filteredCart };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default cartReducer;
