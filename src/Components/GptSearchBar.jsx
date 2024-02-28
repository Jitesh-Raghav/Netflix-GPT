import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const GptSearchBar = () => {
  return (
    <div>

         <div  className="absolute -z-10">
            <img className="transform scale-105" alt="backdrop" src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg"/>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>  
         </div>

       <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 opacity-80 rounded-full">
        <input type="text" className=" p-4 m-5 col-span-9 border-none outline-none bg-black text-white"
          placeholder="What do you wanna watch today, Boss?"/>
        <button className="col-span-3 m-5 py-2 px-4  bg-purple-800 text-white rounded-full border border-transparent hover:border-gray-400"><SearchOutlinedIcon sx={{margin:"5px"}}/>Let's Go! </button>
      </form>
    </div>
    </div>
    
  )
}

export default GptSearchBar
