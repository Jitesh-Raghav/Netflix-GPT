import CheckBoxIcon from '@mui/icons-material/CheckBox';
import React, { useState, useRef } from 'react'
import Header from './Header'
import { CheckValidData } from '../Utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../Utils/firebase";

const Login = () => {
   
  const[isSignInForm, SetIsSignInForm]= useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email= useRef(null);  //it gives the reference to the email field in the form, i.e returns with whatever is in the form.
  const password= useRef(null);

  const toggleSignInForm=()=>{
    SetIsSignInForm(!isSignInForm)
  };

  //This funciton should validate the form data when we press Sign In button
  const handleButtonClick=()=>{
     //CheckValidData
     const message = CheckValidData(email.current.value, password.current.value);
     setErrorMessage(message);

     if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)})
            
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      // signInWithEmailAndPassword(
      //   auth,
      //   email.current.value,
      //   password.current.value
      // )
      //   .then((userCredential) => {
      //     // Signed in
      //     const user = userCredential.user;
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     setErrorMessage(errorCode + "-" + errorMessage);
      //   });
    }
  };

  return (
    <div >
       <Header/>
         <div  className="absolute">
            <img className="transform scale-105" alt="backdrop" src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg"/>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>  
         </div>

         <form  onSubmit={(e) => e.preventDefault()} //this will prevent the form from reloading, when we press the sign in button.
         className="bg-black p-12 absolute w-[450px] h-[750px] my-[90px] mx-auto right-0 left-0 text-white rounded-md bg-opacity-70">

            <h1 className="font-bold text-3xl py-4 mx-7">{isSignInForm? "Sign In": "Sign Up"}</h1>
            
            {/* SHOW THIS FOR SIGN UP PAGE */}
            {!isSignInForm && <input type="text" placeholder="Full Name" className="p-[15px] mx-3 my-2 w-11/12 rounded-md bg-gray-500 bg-opacity-10 border border-gray-500 border-1"/>}

            <input ref={email} type="text" placeholder="Email or Phone Number" className="p-[15px] mx-3 my-2 w-11/12 rounded-md bg-gray-500 bg-opacity-10 border border-gray-500 border-1"/>
            <input ref={password} type="password" placeholder="Password" className="p-[15px] mx-3 my-2 w-11/12 rounded-md bg-gray-500 bg-opacity-10 border border-gray-500 border-1"/>

            <p className="text-red-500 py-2 mx-3">{errorMessage}</p>

            <button className="p-2 my-2 bg-red-600 w-11/12 mx-3 rounded-md hover:bg-red-800" onClick={handleButtonClick}>{isSignInForm? "Sign In": "Sign Up"}</button>

            <p className="mx-[110px] mt-2 hover:text-gray-300 hover:underline cursor-pointer">Forgot Password?</p>
            <p className="mt-24 mx-3 cursor-pointer"><CheckBoxIcon/> Remember Me</p>
            <p className="mx-3 my-2 cursor-pointer hover:text-blue-600"  onClick={toggleSignInForm}> <span className="text-gray-300">{isSignInForm?"New to Netflix?":"Already Registered?"}</span>{isSignInForm?" Sign Up Now!":" Sign In Now."}</p>
            <p className="mx-3 text-xs text-gray-400 my-3">This page is protected by Google reCAPTCHA to ensure you're not a bot.<span className='text-blue-600'> Learn more.</span></p>
         </form>
    </div>

  )
}

export default Login

