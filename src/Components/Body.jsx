import React, { useEffect } from 'react'
import Login from './Login';
import Browse from './Browse';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../Utils/userSlice';


const Body = () => {

  const dispatch= useDispatch();

    const AppRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>,
        },
        {
            path:"/browse",
            element:<Browse/>,
        },

    ]);

    //THIS ONAUTHSTATECHANGED API IS CALLED WHENEVER AUTHENTICATION STATE IS CHANGED, IE WHEN USER SIGN IN, SIGN OUT, LOG IN ETC.., SO IF U WANNA DO SOMETHING WHEN AUTH STATE IS CHANGED THEN WRITE THAT CODE HERE..
    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user  
          const {uid, email, displayName} = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName})); // we doing this cuz addUser is an object, so isliye uid:uid, aisa likha...
           //the navigate logic is written in <login/> section.
        } else {
          // User is signed out
           dispatch(removeUser());
        }
      });
    },[]);

  return (
    <div>
      <RouterProvider router={AppRouter}/>
    </div>
  )
}

export default Body;
