import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const isItemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (isItemPresent) {
        isItemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeItem;
    },

    incrementQuantity: (state, action) => {
      const isItemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      isItemPresent.quantity++;
    },

    decrementQuantity: (state, action) => {
      const isItemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (isItemPresent.quantity === 1) {
        isItemPresent.quantity == 0;

        const removeItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeItem;
      } else {
        isItemPresent.quantity--;
      }
    },
  },
});
