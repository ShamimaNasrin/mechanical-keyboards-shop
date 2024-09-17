import brandsData from "./jsonData/brandsData.json";

type TProp = {
  url: string;
  logo: string;
};

const FeaturedBrands = () => {
  return (
    <>
      <div className="py-10 xl:px-16 lg:px-16 md:px-10 px-7   ">
        <h2 className="font-bold text-4xl mb-4">Our Partners</h2>

        <div className="container mx-auto px-4">
          <div
            className="
          grid gap-4 
          grid-cols-1
          sm:grid-cols-2 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-5
        "
          >
            {brandsData.map((brand, i) => (
              <BrandCard key={i} url={brand.url} logo={brand.logo} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const BrandCard = ({ url, logo }: TProp) => {
  return (
    <div className="h-32 bg-white p-5 shadow-md rounded-lg flex justify-center items-center overflow-hidden relative">
      <a href={url} target="_blank">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={logo}
          alt="Brand Card"
        />
      </a>
    </div>
  );
};

export default FeaturedBrands;
