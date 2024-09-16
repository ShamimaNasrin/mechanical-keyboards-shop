import bannerimg from "../../assets/images/bannerbg.jpg";
import BlackButton from "../../components/buttons/BlackButton";
const HeroSection = () => {
  return (
    <div
      className="bg-zinc-50 h-[90vh] bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${bannerimg})`,
      }}
    >
      <div className=" absolute inset-0 flex flex-col justify-center items-center text-black px-10">
        <h1 className="text-5xl font-bold">NPR 10541</h1>
        <p className="mt-4 text-xl mb-10">
          Halloween sale!! Grab your favourite one on 50% discount!!
        </p>

        <BlackButton str="Shop now" path="/about" />
      </div>
    </div>
  );
};

export default HeroSection;
