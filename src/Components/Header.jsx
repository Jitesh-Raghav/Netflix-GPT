import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Utils/firebase';
import { signOut , onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch  } from 'react-redux';
import { addUser, removeUser } from '../Utils/userSlice';
import { toggleGptSearchView } from "../Utils/gptSlice";
import {SUPPORTED_LANGUAGES } from "../Utils/constants";
import { changeLanguage } from "../Utils/configSlice";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchIcon from '@mui/icons-material/Search';


const Header = () => {

  const navigate = useNavigate();
  const user= useSelector((store)=>store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();

  const handleSignOut=()=>{
    signOut(auth).then(()=>{
       navigate("/");
    }).catch((error)=>{
       navigate("/error");
    });
  };

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    //console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };




      //THIS ONAUTHSTATECHANGED API IS CALLED WHENEVER AUTHENTICATION STATE IS CHANGED, IE WHEN USER SIGN IN, SIGN OUT, LOG IN ETC.., SO IF U WANNA DO SOMETHING WHEN AUTH STATE IS CHANGED THEN WRITE THAT CODE HERE..
      useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User signed in
            // https://firebase.google.com/docs/reference/js/auth.user  
            const {uid, email, displayName} = user;
            dispatch(addUser({uid:uid, email:email, displayName:displayName})); // we doing this cuz addUser is an object, so isliye uid:uid, aisa likha...
            navigate("/browse")                                                 //this is done cuz if user is logged in then he should not be able to acces the /login path
          } else {
            // User is signed out
             dispatch(removeUser());               
             navigate("/")                                                      //this is done cuz if user is logged in then he should not be able to acces the /browse path
          }
        });
      },[]);


  return (
    <div className="absolute w-full px-[140px] py-1 bg-gradient-to-b from-black z-10 flex justify-between">
      <Link to="/browse">
      <img className="w-48 cursor-pointer" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo"/>
      </Link>

     {user && (
     <div className="flex  justify-center items-center -mr-[110px]">

      {/* {showGptSearch &&  */}
      <select className="py-2 px-4 mx-4 my-2 bg-gray-900 text-white rounded-full opacity-60 hover:opacity-100 border border-transparent hover:border-gray-500" onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}> {lang.name}</option>
              ))}
      </select>

      <button onClick={handleGptSearchClick} className="flex items-center py-[6px]  px-4 mx-4 my-2 bg-purple-800 text-white rounded-full opacity-75 hover:opacity-100 hover:bg-purple-950 border border-transparent hover:border-gray-500"><SearchIcon sx={{margin:"3px"}}/> GPT Search</button>
      <button onClick={handleSignOut} className="flex items-center bg-red-700 text-white rounded-full py-2 px-4 mx-4 my-2 opacity-70 hover:opacity-100 hover:bg-red-800 border border-transparent hover:border-gray-500"><LogoutOutlinedIcon/>Sign Out</button>
      <img className="cursor-pointer w-10 h-10 mx-6 rounded-full border border-transparent hover:border-2 hover:border-white" alt="userIcon" src="https://ih1.redbubble.net/image.618405177.2432/flat,750x1000,075,t.u5.jpg"/>
     </div>)}
   
    </div>

  )
}

export default Header
