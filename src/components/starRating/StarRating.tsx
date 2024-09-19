import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      i <= rating ? (
        <IoIosStar key={i} className="text-yellow-400" />
      ) : (
        <IoIosStarOutline key={i} className="text-yellow-400" />
      )
    );
  }

  return <div className="flex">{stars}</div>;
};

export default StarRating;
