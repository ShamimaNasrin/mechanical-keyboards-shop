import StarRating from "../../components/starRating/StarRating";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/features/cartSlice";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useFetchSingleProductByIdQuery } from "../../redux/api/baseApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect } from "react";
import useTitle from "../../customHooks/useTitle";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state: RootState) => state.cart.items);
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useFetchSingleProductByIdQuery(id);

  // console.log("cartState", cartState);
  // console.log("single product data", data);

  const handleAddToCart = () => {
    const product = data?.data;
    if (cartState.length) {
      cartState.map((item) => {
        if (item._id === product._id) {
          if (item.quantity! >= item.stock_quantity) {
            toast.error(`Limit exceeded for this item`);
            return;
          }
        }
      });
    }

    const quantity = 1;
    dispatch(addToCart({ ...product, quantity }));
  };

  //scrolltop
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useTitle("Product");

  return (
    <div className="bg-zinc-100 xl:py-12 lg:py-10 py-7 xl:px-20 lg:px-20 md:px-10 px-7 mx-auto">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col justify-center ">
          <div className="xl:w-[40%] lg:w-[40%] md:w-[40%] w-full flex justify-center items-center">
            <img
              src={data?.data?.img_url}
              alt={data?.data?.name}
              className="w-[90%] object-cover mb-4"
            />
          </div>
          <div className="xl:w-[60%] lg:w-[60%] md:w-[60%] w-full px-5">
            <h2 className="text-2xl font-bold mb-2">{data?.data?.name}</h2>
            <h3 className="text-lg text-gray-600 mb-2 font-semibold">
              {data?.data?.brand}
            </h3>
            <p className="text-[13px] text-gray-600 mb-2 ">
              Shipping calculated at checkout.
            </p>
            <div className="flex items-center mb-2">
              <StarRating rating={data?.data?.rating} />
              <span className="ml-2 text-gray-600">
                ({data?.data?.rating} Stars)
              </span>
            </div>
            <p className="text-xl font-bold mb-2">TK.{data?.data?.price}</p>
            <p className="text-gray-700 mb-2">
              {data?.data?.stock_quantity > 0
                ? `In Stock (${data?.data?.stock_quantity} Pieces available)`
                : "Stock Out"}
            </p>
            <p className="text-gray-700 mb-4">{data?.data?.description}</p>

            <button
              onClick={handleAddToCart}
              disabled={data?.data?.stock_quantity === 0}
              className={`bg-black text-white mx-auto text-sm px-3 py-2 transition-all duration-500  ${
                data?.data?.stock_quantity === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-800"
              }`}
            >
              {data?.data?.stock_quantity === 0 ? "Stock Out" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
