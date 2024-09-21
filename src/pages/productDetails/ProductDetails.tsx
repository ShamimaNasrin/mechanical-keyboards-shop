// import { useState } from "react";
import StarRating from "../../components/starRating/StarRating";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/features/cartSlice";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";

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

type TProductDetailsProps = {
  product: TProduct;
};

const ProductDetails: React.FC<TProductDetailsProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state: RootState) => state.cart.products);

  // console.log("cartState", cartState);

  const handleAddToCart = (product: TProduct) => {
    const quantity = 1;

    if (cartState.length === 0) {
      dispatch(addToCart({ product, quantity }));
    } else {
      cartState.map((item) => {
        if (item.id === product.id) {
          if (item.quantity! < item.stock_quantity) {
            dispatch(addToCart({ product, quantity }));
          } else {
            toast.error(`Limit exceeded for this item`);
          }
        }
      });
    }
  };

  return (
    <div className="bg-zinc-100 xl:py-12 lg:py-10 py-7 xl:px-20 lg:px-20 md:px-10 px-7 mx-auto">
      <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col justify-center ">
        <div className="xl:w-[40%] lg:w-[40%] md:w-[40%] w-full flex justify-center items-center">
          <img
            src={product.img_url}
            alt={product.name}
            className="w-[90%] object-cover mb-4"
          />
        </div>
        <div className="xl:w-[60%] lg:w-[60%] md:w-[60%] w-full px-5">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <h3 className="text-lg text-gray-600 mb-2 font-semibold">
            {product.brand}
          </h3>
          <p className="text-[13px] text-gray-600 mb-2 ">
            Shipping calculated at checkout.
          </p>
          <div className="flex items-center mb-2">
            <StarRating rating={product.rating} />
            <span className="ml-2 text-gray-600">({product.rating} Stars)</span>
          </div>
          <p className="text-xl font-bold mb-2">TK.{product.price}</p>
          <p className="text-gray-700 mb-2">
            {product?.stock_quantity > 0
              ? `In Stock (${product?.stock_quantity} Pieces available)`
              : "Stock Out"}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <button
            onClick={() => handleAddToCart(product)}
            disabled={product?.stock_quantity === 0}
            className={`bg-black text-white mx-auto text-sm px-3 py-2 transition-all duration-500  ${
              product?.stock_quantity === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-800"
            }`}
          >
            {product?.stock_quantity === 0 ? "Stock Out" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
