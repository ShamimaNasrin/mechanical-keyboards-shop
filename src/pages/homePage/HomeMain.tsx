import AdvertiseService from "./AdvertiseService";
import FeaturedBrands from "./FeaturedBrands";
import HeroSection from "./HeroSection";

const HomeMain = () => {
  return (
    <div className="bg-zinc-50">
      <HeroSection />
      <AdvertiseService />
      <FeaturedBrands />
    </div>
  );
};

export default HomeMain;
