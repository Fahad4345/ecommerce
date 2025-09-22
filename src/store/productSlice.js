import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = action.payload;
    },

    clearCart: (state) => {
      state.items = null;
    },
  },
});

export const { addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
