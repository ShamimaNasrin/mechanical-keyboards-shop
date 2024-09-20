import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";

type TProduct = {
  img_url: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock_quantity: number;
};

type TCartItemProps = {
  product: TProduct;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
};

const CartMain = () => {
  const [cart, setCart] = useState<TProduct[]>([
    // Example initial products
    {
      img_url: "https://i.ibb.co.com/BP8BKZf/moon-landing-15.webp",
      id: 1,
      name: "Drop Alt High-Profile Mechanical Keyboard",
      price: 29.99,
      quantity: 2,
      stock_quantity: 10,
    },
    {
      img_url: "https://i.ibb.co.com/BP8BKZf/moon-landing-15.webp",
      id: 2,
      name: "Corsair K95 RGB Platinum XT Mechanical Keyboard fdvfdvgfbgbgfb",
      price: 49.99,
      quantity: 1,
      stock_quantity: 3,
    },
  ]);

  const navigate = useNavigate();

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  // Navigate to checkout page
  const handleCheckout = () => {
    navigate("/checkout");
  };

  const isCheckoutDisabled = cart.some(
    (product) => product?.quantity > product?.stock_quantity
  );

  return (
    <div className="bg-zinc-100 xl:py-12 lg:py-10 py-7 xl:px-20 lg:px-20 md:px-10 px-7 mx-auto w-full min-h-[70vh] ">
      <div className="mx-auto max-w-2xl bg-zinc-100 ">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        <div className="flex justify-between items-center font-medium border-b-2 border-zinc-300 pb-2 px-2">
          <div className="w-[65%] ">Product</div>
          <div className="w-[35%] flex gap-10  text-center">
            <div>Quantity</div>
            <div>Subtotal</div>
          </div>
        </div>
        <div>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
        <div className="mt-6 text-right">
          <p className="text-lg font-medium">
            Total: {calculateTotalPrice().toFixed(2)} tk
          </p>
          <button
            className={`mt-4 px-4 py-2 font-medium text-white ${
              isCheckoutDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleCheckout}
            disabled={isCheckoutDisabled}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const CartItem: React.FC<TCartItemProps> = ({
  product,
  updateQuantity,
  removeFromCart,
}) => {
  const handleIncrease = () => {
    if (product?.quantity < product?.stock_quantity) {
      updateQuantity(product.id, product.quantity + 1);
    } else {
      toast.error("Limit exceeded");
    }
  };

  const handleDecrease = () => {
    if (product?.quantity > 1) {
      updateQuantity(product.id, product?.quantity - 1);
    }
  };

  const calculateSubtotal = () => {
    return product.price * product.quantity;
  };

  return (
    <div className=" px-2 py-7 border-b border-dashed border-zinc-300 flex items-center justify-between ">
      <div className="w-[65%] ">
        <h3 className="font-medium text-gray-700">
          {product.name?.length > 48
            ? product.name?.slice(0, 48) + "..."
            : product.name}
        </h3>
        <p className="text-gray-500 text-sm">{product.price.toFixed(2)} tk</p>
      </div>
      <div className="w-[35%] flex gap-9 ">
        <div className="px-[10px] py-[6px] flex items-center rounded border border-gray-400 ">
          <button
            className="w-[26px] h-[26px] text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-300"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="mx-2 text-sm">{product.quantity}</span>
          <button
            className=" w-[26px] h-[26px] text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-300"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <div className="text-right text-sm ">
          <p>{calculateSubtotal().toFixed(2)} tk</p>
        </div>
      </div>
      <div className="text-right ">
        <button
          className="text-red-600 hover:text-red-800"
          onClick={() => removeFromCart(product.id)}
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartMain;
