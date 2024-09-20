import { useEffect } from "react";
import AdvertiseService from "./AdvertiseService";
import FeaturedBrands from "./FeaturedBrands";
import FeaturedProds from "./FeaturedProds";
import HeroSection from "./HeroSection";
import Reviews from "./Reviews";
import useTitle from "../../customHooks/useTitle";
import CustomSection from "./CustomSection";
import BestSeller from "./BestSeller";

const HomeMain = () => {
  //scrolltop
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useTitle("KeyClicks");
  return (
    <div className="bg-zinc-50">
      <HeroSection />
      <AdvertiseService />
      <FeaturedProds />
      <CustomSection />
      <BestSeller />
      <Reviews />
      <FeaturedBrands />
    </div>
  );
};

export default HomeMain;
