import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../Utils/firebase';
import { signOut , onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch  } from 'react-redux';
import { addUser, removeUser } from '../Utils/userSlice';
import { toggleGptSearchView } from "../Utils/gptSlice";


const Header = () => {

  const navigate = useNavigate();
  const user= useSelector((store)=>store.user);
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
      <img className="w-48" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo"/>
   
     {user && (
     <div className="flex  justify-center items-center -mr-[110px]">
      <button onClick={handleGptSearchClick} className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900 border border-transparent hover:border-gray-500">GPT Search</button>
      <button onClick={handleSignOut} className="bg-red-700 text-white rounded-md py-2 px-4 mx-4 my-2 hover:bg-red-900">Sign Out</button>
      <img className="w-10 h-10 mx-6" alt="userIcon" src="https://ih1.redbubble.net/image.618405177.2432/flat,750x1000,075,t.u5.jpg"/>
     </div>)}
   
    </div>

  )
}

export default Header
