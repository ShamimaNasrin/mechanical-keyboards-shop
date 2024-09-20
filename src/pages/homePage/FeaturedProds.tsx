import productsData from "./jsonData/productsData.json";
import BlackButton from "../../components/buttons/BlackButton";
import ProductCard from "../../components/cards/ProductCard";

const FeaturedProds = () => {
  return (
    <>
      <div className="py-7 xl:px-16 lg:px-16 md:px-10 px-7 bg-zinc-200 ">
        <h2 className="font-bold text-4xl mb-4">Featured Keyboards</h2>

        <div className="container mx-auto pb-4 xl:px-4 lg:px-4 ">
          <div
            className="
          grid gap-4 
          grid-cols-1
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-4
        mx-auto "
          >
            {productsData.length
              ? productsData.map((prod, i) => (
                  <ProductCard
                    key={i}
                    img_url={prod?.img_url}
                    name={prod?.name}
                    brand={prod?.brand}
                    quantity={prod?.quantity}
                    price={prod?.price}
                    rating={prod?.rating}
                  />
                ))
              : null}
          </div>
        </div>

        <div className="flex justify-center items-center mt-4 mb-0">
          <BlackButton str="Shop now" path="/products" />
        </div>
      </div>
    </>
  );
};

export default FeaturedProds;
