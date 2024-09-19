import AdvertiseService from "./AdvertiseService";
import FeaturedBrands from "./FeaturedBrands";
import FeaturedProds from "./FeaturedProds";
import HeroSection from "./HeroSection";
import Reviews from "./Reviews";

const HomeMain = () => {
  return (
    <div className="bg-zinc-50">
      <HeroSection />
      <AdvertiseService />
      <FeaturedProds />
      <Reviews />
      <FeaturedBrands />
    </div>
  );
};

export default HomeMain;
