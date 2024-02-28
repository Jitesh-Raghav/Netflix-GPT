import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { BG_URL } from '../Utils/constants';
import lang from '../Utils/languageConstants';
import { useSelector } from 'react-redux';


const GptSearchBar = () => {

   const langKey = useSelector((store) => store.config.lang);   //SO TO CHANGE LANG IN GPT SEARCH WHAT WE DID IS, WE FIRST CREATED A CONFIG SLICE FOR LANGUAGE, THEN IN HEADER WE CREATE A SELECT-OPTION THING, AND WE ADDED A ONCLICK TO IT, THAT ADDS THE LAGUANGE THAT IS CLICKED TO THE CONFIG, STORE, AND HERE, WE ARE CALLING THE STORE, UPDATING THE BUTTONS WITH WHATEVER LANGUAGE IS PRESENT INSIDE THE STORE...SO THAT'S HOW IT IS WORKING. 

  return (
    <div>

         <div  className="absolute -z-10">
            <img className="transform scale-105" alt="backdrop" src={BG_URL}/>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-85"></div>  
         </div>

       <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 opacity-80 rounded-full">
        <input type="text" className=" p-4 m-5 col-span-9 border-none outline-none bg-black text-white"
          placeholder={lang[langKey].gptSearchPlaceholder }/>
        <button className="col-span-3 m-5 py-2 px-4  bg-purple-800 text-white rounded-full border border-transparent hover:border-gray-400"><SearchOutlinedIcon sx={{margin:"5px"}}/>{lang[langKey].search} </button>
      </form>
    </div>
    </div>
    
  )
}

export default GptSearchBar
