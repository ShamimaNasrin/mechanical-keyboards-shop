import { useEffect } from "react";
import AdvertiseService from "./AdvertiseService";
import FeaturedBrands from "./FeaturedBrands";
import FeaturedProds from "./FeaturedProds";
import HeroSection from "./HeroSection";
import Reviews from "./Reviews";
import useTitle from "../../customHooks/useTitle";

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
      <Reviews />
      <FeaturedBrands />
    </div>
  );
};

export default HomeMain;
