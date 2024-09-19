import { useState } from "react";
import StarRating from "../../components/starRating/StarRating";

type TProduct = {
  name: string;
  img_url: string;
  brand: string;
  quantity: number;
  price: number;
  rating: number;
  description: string;
};

type TCartItem = {
  product: TProduct;
  quantity: number;
};

type TProductDetailsProps = {
  product: TProduct;
};

const ProductDetails: React.FC<TProductDetailsProps> = ({ product }) => {
  const [cart, setCart] = useState<TCartItem[]>([]);

  const handleAddToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.name === product.name
      );

      if (existingItem) {
        if (existingItem.quantity < product.quantity) {
          return prevCart.map((item) =>
            item.product.name === product.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        alert("Cannot add more than available quantity.");
        return prevCart;
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  console.log("cart info:", cart);

  return (
    <div className="bg-zinc-100 xl:py-12 lg:py-10 py-7 xl:px-20 lg:px-20 md:px-10 px-7 mx-auto">
      <div className="flex">
        <div className="w-[40%] flex justify-center items-center">
          <img
            src={product.img_url}
            alt={product.name}
            className="w-[90%] object-cover mb-4"
          />
        </div>
        <div className="w-[60%] px-5">
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
            {product?.quantity > 0
              ? `In Stock (${product?.quantity} Pieces available)`
              : "Stock Out"}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <button
            onClick={handleAddToCart}
            disabled={product?.quantity === 0}
            className={`bg-black text-white mx-auto text-sm px-3 py-2 transition-all duration-500  ${
              product?.quantity === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-800"
            }`}
          >
            {product?.quantity === 0 ? "Stock Out" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
