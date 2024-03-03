import { IMG_CDN_URL } from "../Utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4 rounded-lg">
      <img alt="Movie Card" className="rounded-lg hover:rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;
