import { useEffect, useState } from "react";
import ProductCard from "../../components/cards/ProductCard";
import useTitle from "../../customHooks/useTitle";
import useDebounce from "../../customHooks/useDebounce";
import { useFetchFilteredItemsQuery } from "../../redux/api/baseApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import NoDataFound from "../../components/NoDataFound";
import { TProduct } from "../../types";

const ProductsMain = () => {
  const [byPriceRange, setByPriceRange] = useState({
    minPrice: 0,
    maxPrice: 20000,
  });

  const [sortByPrice, setSortByPrice] = useState("");
  const [searchByNameOrBrand, setSearchByNameOrBrand] = useState("");
  const debounceValue = useDebounce(searchByNameOrBrand);

  // console.log("byPriceRange", byPriceRange);

  const { data, isLoading } = useFetchFilteredItemsQuery({
    search: debounceValue,
    sortBy: sortByPrice,
    minPrice: byPriceRange.minPrice,
    maxPrice: byPriceRange.maxPrice,
  });

  // console.log("data", data);

  const handleFilterClear = () => {
    window.location.reload();
  };

  //scrolltop
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [debounceValue]);
  useTitle("Products");

  return (
    <div className="min-h-[70vh] xl:py-12 lg:py-10 py-7 xl:px-16 lg:px-16 md:px-10 px-7 bg-zinc-100 ">
      <h2 className="font-bold text-4xl mb-4">Mechanical Keyboards</h2>

      <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col justify-between">
        {/* filter section */}
        <div className="xl:w-[25%] lg:w-[25%] md:w-[35%] w-full ">
          <div className="p-7">
            {/* price range filter */}
            <h4 className="font-bold text-xl mb-4">By Price</h4>
            <div className="w-full flex gap-2 justify-between items-center">
              <input
                type="number"
                name="minPrice"
                onBlur={(e) =>
                  setByPriceRange((prev) => ({
                    ...prev,
                    minPrice: +e.target.value,
                  }))
                }
                placeholder="0"
                className="w-1/2 bg-zinc-100 p-2 focus:outline-none border border-gray-400 rounded"
              />
              <input
                type="number"
                name="maxPrice"
                onBlur={(e) =>
                  setByPriceRange((prev) => ({
                    ...prev,
                    maxPrice: +e.target.value,
                  }))
                }
                placeholder="20000"
                className="w-1/2 bg-zinc-100 p-2 focus:outline-none border border-gray-400 rounded"
              />
            </div>

            {/* price select */}
            <div className="relative inline-block w-full max-w-sm my-4">
              <select
                value={sortByPrice}
                onChange={(e) => setSortByPrice(e.target.value)}
                className="block appearance-none w-full bg-zinc-100 border-b border-gray-400 text-gray-700 p-1 pr-8 leading-tight focus:outline-none "
              >
                <option value="" disabled>
                  Sort by price
                </option>
                <option value="priceAsc">Price, low to high</option>
                <option value="priceDesc">Price, high to low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.516 7.548a.997.997 0 011.461 0L10 10.572l3.023-3.024a.997.997 0 011.461 0 .997.997 0 010 1.461l-3.75 3.75a.997.997 0 01-1.461 0l-3.75-3.75a.997.997 0 010-1.461z" />
                </svg>
              </div>
            </div>

            {/* search by brand or name */}
            <h4 className="font-bold text-xl my-4">Search Product</h4>
            <div>
              <input
                onChange={(e) => {
                  setSearchByNameOrBrand(e.target.value);
                }}
                value={searchByNameOrBrand}
                type="text"
                placeholder="Search by brand or name"
                className="w-full p-1 pr-8 bg-zinc-100 border-b border-gray-400 focus:outline-none"
              />
            </div>

            <div className="w-full flex justify-center items-center mx-auto my-5">
              <button
                onClick={handleFilterClear}
                className="bg-black text-white mx-auto text-sm px-3 py-2 transition-all duration-500 hover:bg-gray-800 "
              >
                Clear filter
              </button>
            </div>
          </div>
        </div>
        {/* product card section */}
        <div className="container mx-auto py-4 xl:px-4 lg:px-4 xl:w-[75%] lg:w-[75%] md:w-[65%] w-full">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div
              className="
        grid gap-4 
        grid-cols-1
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-2 
        xl:grid-cols-3
      mx-auto "
            >
              {data?.data?.length ? (
                data?.data?.map((prod: TProduct) => (
                  <ProductCard
                    key={prod._id}
                    _id={prod._id}
                    img_url={prod?.img_url}
                    name={prod?.name}
                    brand={prod?.brand}
                    stock_quantity={prod?.stock_quantity}
                    price={prod?.price}
                    rating={prod?.rating}
                  />
                ))
              ) : (
                <NoDataFound />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsMain;
