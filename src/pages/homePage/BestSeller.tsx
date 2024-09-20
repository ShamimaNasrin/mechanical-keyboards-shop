import bestSellerData from "./jsonData/bestSellerData.json";
import BestSellerProdCard from "../../components/cards/BestSellerProdCard";

const BestSeller = () => {
  return (
    <>
      <div className="py-7 xl:px-16 lg:px-16 md:px-10 px-7 bg-zinc-200 ">
        <h2 className="font-bold text-4xl mb-4">Best Sellers</h2>

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
            {bestSellerData.length
              ? bestSellerData.map((prod, i) => (
                  <BestSellerProdCard
                    key={i}
                    img_url={prod?.img_url}
                    name={prod?.name}
                    brand={prod?.brand}
                    rating={prod?.rating}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSeller;
