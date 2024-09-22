import { createSlice } from "@reduxjs/toolkit";

type TProduct = {
  id: number;
  name: string;
  img_url: string;
  brand: string;
  stock_quantity: number;
  price: number;
  rating: number;
  description: string;
  quantity?: number;
};

type TCartState = {
  products: (TProduct & { quantity?: number })[];
  totalPrice: number;
  totalItemSelectQuantity: number;
};

const initialState: TCartState = {
  products: [],
  totalPrice: 0,
  totalItemSelectQuantity: 0,
};

// to calculate total number of selected product quantity
const calculateTotalItemSelectQuantity = (state: TCartState): number => {
  return state.products.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
};

// to calculate the total price
const calculateTotalPrice = (state: TCartState): number => {
  return state.products.reduce(
    (total, item) => total + item.price * (item.quantity || 0),
    0
  );
};

// cart management functions
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { quantity, product } = action.payload;
      const isExist = state.products.find((item) => item.id === product.id);
      if (isExist) {
        isExist.quantity! += 1;
      } else {
        state.products.push({ ...product, quantity: quantity });
      }
      state.totalItemSelectQuantity = calculateTotalItemSelectQuantity(state);
      state.totalPrice = calculateTotalPrice(state);
    },

    quantityIncrement: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (product) {
        product.quantity! += 1;
        state.totalItemSelectQuantity = calculateTotalItemSelectQuantity(state);
        state.totalPrice = calculateTotalPrice(state);
      }
    },
    quantityDecrement: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (product && product.quantity! > 1) {
        product.quantity! -= 1;
        state.totalItemSelectQuantity = calculateTotalItemSelectQuantity(state);
        state.totalPrice = calculateTotalPrice(state);
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((item) => item.id !== productId);
      state.totalItemSelectQuantity = calculateTotalItemSelectQuantity(state);
      state.totalPrice = calculateTotalPrice(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  quantityIncrement,
  quantityDecrement,
} = cartSlice.actions;

export default cartSlice.reducer;
