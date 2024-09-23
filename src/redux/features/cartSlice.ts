import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TCart = {
  _id: string;
  name: string;
  img_url: string;
  stock_quantity: number;
  price: number;
  quantity?: number;
};

type TCartState = {
  items: TCart[];
  totalPrice: number;
  // totalItemSelectQuantity: number;
};

const initialState: TCartState = {
  items: [],
  totalPrice: 0,
  // totalItemSelectQuantity: 0,
};

// to calculate the total price
const calculateTotalPrice = (state: TCartState): number => {
  // console.log("totalPrice called");
  return state.items.reduce(
    (total, item) => total + item.price * (item.quantity || 0),
    0
  );
};

// cart management functions
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCart>) => {
      const product = action.payload;
      const isExist = state.items.find((item) => item._id === product._id);
      if (isExist) {
        if (isExist.quantity! + product.quantity! <= product.stock_quantity) {
          isExist.quantity! += product.quantity!;
        } else {
          alert("Limit exceeded");
        }
      } else {
        state.items.push(product);
      }

      state.totalPrice = calculateTotalPrice(state);
    },

    quantityUpdate: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const { _id, quantity } = action.payload;
      const isExist = state.items.find((item) => item._id === _id);

      if (isExist && quantity <= isExist.stock_quantity && quantity >= 1) {
        // Create a new array for immutability
        const updatedItems = state.items.map((item) =>
          item._id === _id ? { ...item, quantity } : item
        );
        state.items = updatedItems;
      }
      state.totalPrice = calculateTotalPrice(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.totalPrice = calculateTotalPrice(state);
    },

    reSetCart: (state) => {
      // console.log("reSetCart triggered");
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, quantityUpdate, removeFromCart, reSetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
