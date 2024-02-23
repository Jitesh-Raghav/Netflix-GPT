import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../Utils/firebase';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate = useNavigate();
  const user= useSelector((store)=>store.user);

  const handleSignOut=()=>{
    signOut(auth).then(()=>{
       navigate("/");
    }).catch((error)=>{
       navigate("/error");
    });
  };
  return (
    <div className="absolute w-full px-[140px] py-1 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-48" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo"/>
   
     {user && (<div className="flex justify-center items-center">
      <img className="w-12 h-12 mx-6" alt="userIcon" src="https://ih1.redbubble.net/image.618405177.2432/flat,750x1000,075,t.u5.jpg"/>
      <button onClick={handleSignOut} className="bg-red-600 text-gray-300 rounded-md p-1 hover:bg-red-700 hover:text-white">Sign Out</button>
     </div>)}
   
    </div>

  )
}

export default Header
