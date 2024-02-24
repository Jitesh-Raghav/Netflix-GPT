import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const VideoTitle = ({title, overview}) => {
  return (
    <div className="pt-36 px-12">
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="py-6 text-lg w-1/3">{overview}</p>

        <div className="flex items-center">
          <button className="bg-gray-500 text-white px-12 py-3 text-xl  rounded-md hover:bg-opacity-80">{<PlayArrowIcon fontSize="large"/>} Play</button>
          <button className="bg-gray-500 text-white px-12 py-4 text-xl  rounded-md hover:bg-opacity-80 mx-3">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;
