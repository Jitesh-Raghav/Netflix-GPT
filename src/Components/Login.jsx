import React from 'react'
import Header from './Header'

const Login = () => {
  return (
    <div >
       <Header/>
         <div  className="absolute">
            <img alt="backdrop" src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg"/>
         </div>

         <form className="bg-black p-12 absolute w-3/12 my-36 mx-auto right-0 left-0 text-white">
            <h1 className="font-bold text-3xl">Sign In</h1>
            <input type="text" placeholder="Email address" className="p-2 m-2"/>
            <input type="password" placeholder="Password" className="p-2 m-2"/>
            <button className="p-2 m-2">Sign In</button>
         </form>
    </div>

  )
}

export default Login

