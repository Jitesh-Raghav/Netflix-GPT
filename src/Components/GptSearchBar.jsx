import React, { useRef } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { API_OPTIONS, BG_URL } from '../Utils/constants';
import lang from '../Utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../Utils/openai';
import { addGptMovieResult } from '../Utils/gptSlice';

const GptSearchBar = () => {

  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);   //SO TO CHANGE LANG IN GPT SEARCH WHAT WE DID IS, WE FIRST CREATED A CONFIG SLICE FOR LANGUAGE, THEN IN HEADER WE CREATE A SELECT-OPTION THING, AND WE ADDED A ONCLICK TO IT, THAT ADDS THE LAGUANGE THAT IS CLICKED TO THE CONFIG, STORE, AND HERE, WE ARE CALLING THE STORE, UPDATING THE BUTTONS WITH WHATEVER LANGUAGE IS PRESENT INSIDE THE STORE...SO THAT'S HOW IT IS WORKING. 
  const searchText = useRef(null);

// search movie in TMDB
  const searchMovieTMDB= async(movie)=>{
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS );
    const json = await data.json();

    return json.results;
  };


  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    // Make an API call to GPT API and get Movie Results
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    if (!gptResults.choices) {
      // TODO: Write Error Handling
      <h1 className='flex items-center text-2xl font-mono font-semibold text-white'>Err..looks like we're facing some issues. Try again later!</h1>
    }
        // For each movie I will search TMDB API

        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        // [Promise, Promise, Promise, Promise, Promise]
    
        const tmdbResults = await Promise.all(promiseArray);
    
        console.log(tmdbResults);
     
        dispatch( addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));

  }
 

  return (
    <div>

      <div className="fixed -z-10">
        <img className="h-screen w-screen object-cover" alt="backdrop" src={BG_URL} />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-85"></div>
      </div>

      <div className="pt-[45%] md:pt-[10%] flex justify-center">
        <form
          className="w-full md:w-1/2 bg-black grid grid-cols-12 opacity-80 rounded-full border border-1 border-purple-900 " onSubmit={(e) => e.preventDefault()}>
          <input type="text" ref={searchText}
            className=" p-4 m-5 col-span-9 border-none outline-none bg-black text-white"
            placeholder={lang[langKey].gptSearchPlaceholder} />
          <button onClick={handleGptSearchClick} className="w-[100px] -ml-5 md:-ml-0 md:ml-5 md:w-[150px] col-span-3 m-5 px-4 flex items-center bg-purple-800 text-white rounded-full border border-transparent hover:border-gray-400"><SearchOutlinedIcon sx={{ margin: "5px" }} />{lang[langKey].search} </button>
        </form>
      </div>
    </div>

  )
}

export default GptSearchBar
