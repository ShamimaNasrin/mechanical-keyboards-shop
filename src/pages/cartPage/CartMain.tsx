import { Link, useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  quantityDecrement,
  quantityIncrement,
  removeFromCart,
} from "../../redux/features/cartSlice";

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

type TCartItemProps = {
  product: TProduct;
};

const CartMain = () => {
  const navigate = useNavigate();
  const products = useAppSelector((state: RootState) => state.cart.products);
  const totalPrice = useAppSelector(
    (state: RootState) => state.cart.totalPrice
  );

  // Navigate to checkout page
  const handleCheckout = () => {
    navigate("/checkout");
  };

  // disable checkout if stock limit exceed
  const isCheckoutDisabled = products.some(
    (prod) => prod.quantity! > prod?.stock_quantity
  );

  return (
    <div className="bg-zinc-100 xl:py-12 lg:py-10 py-7 xl:px-20 lg:px-20 md:px-10 px-7 mx-auto w-full min-h-[70vh] ">
      {products.length ? (
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
            {products.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-lg font-medium">
              Total: {totalPrice.toFixed(2)} tk
            </p>
            <button
              className={`mt-4 px-4 py-2 font-medium text-white ${
                isCheckoutDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-700"
              }`}
              onClick={handleCheckout}
              disabled={isCheckoutDisabled}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            You haven't add any item yet!!
          </h2>
          <Link to="/products">
            <button
              className="font-medium px-5 py-3 absolute z-10 rounded border-none bg-black text-white hover:bg-gray-700"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

const CartItem: React.FC<TCartItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleIncrease = (id: number) => {
    if (product?.quantity && product?.quantity < product?.stock_quantity) {
      dispatch(quantityIncrement(id));
    } else {
      toast.error("Limit exceeded");
    }
  };

  const handleDecrease = (id: number) => {
    if (product?.quantity && product?.quantity > 1) {
      dispatch(quantityDecrement(id));
    }
  };
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const calculateSubtotal = () => {
    if (product?.quantity) {
      return product.price * product.quantity;
    } else return product.price;
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
            onClick={() => handleDecrease(product.id)}
          >
            -
          </button>
          <span className="mx-2 text-sm">{product.quantity}</span>
          <button
            className=" w-[26px] h-[26px] text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-300"
            onClick={() => handleIncrease(product.id)}
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
          onClick={() => handleRemove(product.id)}
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartMain;
