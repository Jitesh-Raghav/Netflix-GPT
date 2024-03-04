import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRated from '../hooks/useTopRated';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GPTSearch from './GPTSearch';
import { useSelector } from "react-redux";
import Footer from './Footer';
import MovieSliderShimmer from './MovieSliderSimmer';

const Browse = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const movies = useSelector((store) => store?.movies);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRated();
  useUpcomingMovies();

  return (
    <div>
      <Header/>
      {showGptSearch ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />

          {
            movies.nowPlayingMovies?(<SecondaryContainer />):( <MovieSliderShimmer dimention={'w-28 md:w-36'} />)
          }
          <Footer/>
        </>
      )}
    </div>
  )
}

export default Browse;


// {
//   movies.topRated ? (
//     <MovieSlider type={null} heading="Top Rated Movies" data={movies.topRated} />
//   ) : (
//     <MovieSliderShimmer dimention={'w-28 md:w-36'} />
//   )
// }