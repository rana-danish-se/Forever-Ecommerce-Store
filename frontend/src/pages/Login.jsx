import React, { useState } from 'react'

const Login = () => {
  const[currentState,setCurrentState]=useState('Login');
  const submitHandler=async(e)=>{
   e.preventDefault();
  }
  return (
    <form onSubmit={submitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
           <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">{currentState}</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
           </div>
        { currentState==='Sign Up'&&  <input required  type="text" className="w-full px-3 py-2 border border-gray-800" placeholder='Name' />}
           <input  required type="email" className="w-full px-3 py-2 border required  border-gray-800" placeholder='Email' />
           <input type="password" className="w-full px-3 py-2 border border-gray-800" placeholder='Password' />
           <div className='w-full flex justify-between text-sm mt-[-8px]'>
              <p className='cursor-pointer'>Forgot Password</p>
              <p onClick={()=>{
                currentState==='Sign Up'?setCurrentState('Login'):setCurrentState('Sign Up');
              }} className="cursor-pointer">{currentState==='Sign Up'?'Login Here':'Create account'}</p>
           </div>
           <button className='bg-black text-white font-light px-8 py-2 mt-4' type='submit'>{currentState==='Login'?'Sign In':'Sign Up'}</button>
    </form>
  )
}

export default Login