import { TiStar } from "react-icons/ti";
import CardButton from "../buttons/CardButton";

type TProductProps = {
  img_url: string;
  name: string;
  brand: string;
  quantity: number;
  price: number;
  rating: number;
};

const ProductCard = ({
  img_url,
  name,
  brand,
  quantity,
  price,
  rating,
}: TProductProps) => {
  return (
    <div className=" bg-white rounded-md shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 border">
      <div className="overflow-hidden">
        <img
          src={img_url}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>

      <div className="p-4 ">
        <h2 className="font-bold text-lg mb-2">
          {name?.length > 50 ? name?.slice(0, 50) + "..." : name}
        </h2>
        <p className="text-sm text-gray-500 mb-1">Brand: {brand}</p>
        <p className="text-sm text-gray-500 mb-3">InStock: {quantity}</p>

        <div className="flex items-center mb-3">
          <p className="text-xl font-semibold text-gray-800">TK.{price}</p>
        </div>

        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <TiStar
              key={i}
              className={`text-yellow-500 ${i < rating ? "" : "opacity-30"}`}
            />
          ))}
        </div>

        <CardButton str="See Details" path="/productDetails" />
      </div>
    </div>
  );
};

export default ProductCard;
