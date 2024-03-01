import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[18%] px-6 md:px-16 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="py-4 text-lg w-1/3">{overview}</p>

        <div className="flex items-center">
          <button className="flex items-center bg-white text-black px-12 py-[14px] text-xl  rounded-md hover:bg-opacity-60">{<PlayArrowIcon fontSize="large"/>} Play</button>
          <button className="flex items-center bg-gray-500 text-white px-12 py-4 text-xl  rounded-md bg-opacity-80 hover:bg-opacity-60 mx-3">{<InfoOutlinedIcon sx={{margin:"5px"}}/>} More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;
