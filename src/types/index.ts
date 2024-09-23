export type TProduct = {
  _id: string;
  name: string;
  img_url: string;
  brand: string;
  stock_quantity: number;
  price: number;
  rating: number;
  description: string;
  quantity?: number;
};

export type IProduct = {
  _id?: string;
  name: string;
  img_url: string;
  brand: string;
  stock_quantity: number;
  price: number;
  rating: number;
  description: string;
};
