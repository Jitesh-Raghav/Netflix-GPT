import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="w-screen h-screen">
      <h1 className="text-2xl md:text-4xl font-semibold text-white pt-5 mt-5 px-5 mx-5 flex items-center"><TheaterComedyIcon fontSize="large" margin="2px"/> We cooked this for you!!</h1>
    <div className="   text-white bg-opacity-90 w-full">
      <div className=" px-4 mt-4 mb-5 text-white bg-opacity-90 w-screen h-screen"> 
        {movieNames.map((movieName, index) => (
          <MovieList key={movieName} title={movieName} movies={movieResults[index]}/>
        ))}
      </div>  
    </div>
    </div>
  );
};
export default GptMovieSuggestions;
