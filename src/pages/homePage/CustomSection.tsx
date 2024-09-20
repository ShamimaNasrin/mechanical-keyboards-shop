import keycaps from "../../assets/images/keycaps.jpg";
import keyswitch from "../../assets/images/keyswitch.webp";
import keybarebones from "../../assets/images/keybarebones.webp";
import keytools from "../../assets/images/keytools.jpg";

type TImage = {
  id: number;
  imageSrc: string;
  title: string;
};

const images: TImage[] = [
  {
    id: 1,
    imageSrc: keycaps,
    title: "Keycaps",
  },
  {
    id: 2,
    imageSrc: keyswitch,
    title: "Switches",
  },
  {
    id: 3,
    imageSrc: keybarebones,
    title: "Barebones",
  },
  {
    id: 4,
    imageSrc: keytools,
    title: "Accessories",
  },
];

const CustomSection = () => {
  return (
    <div className="py-7 xl:px-16 lg:px-16 md:px-10 px-7">
      <h2 className="font-bold text-4xl mb-4">Customise your keyboard</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 xl:px-4 lg:px-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative w-full pb-[100%] overflow-hidden group "
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 before:absolute before:inset-0 before:bg-black before:opacity-25"
              style={{ backgroundImage: `url(${image.imageSrc})` }}
            />
            <h4 className="absolute bottom-0 left-0 m-4 text-white text-lg font-bold z-10">
              {image.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSection;
