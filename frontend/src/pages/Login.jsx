import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, backend_url } = useContext(ShopContext);

  // ✅ New state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const payload =
        currentState === 'Login'
          ? { email, password }
          : { name, email, password };

      const endpoint =
        currentState === 'Login'
          ? `${backend_url}/api/user/login`
          : `${backend_url}/api/user/register`;

      const res = await axios.post(endpoint, payload);

      if (res.data.success) {
        toast.success(res.data.message || `${currentState} Successful`);
        if (res.data.token) {
          setToken(res.data.token);
          localStorage.setItem('user_token', res.data.token); // optional
          navigate('/');
        }
      } else {
        toast.error(res.data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(()=>{
    if(!token && localStorage.getItem('user_token')){
      setToken(localStorage.getItem('user_token'))
    }
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Sign Up' && (
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
        />
      )}

      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
      />

      <input
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Password</p>
        <p
          onClick={() => {
            setCurrentState(currentState === 'Sign Up' ? 'Login' : 'Sign Up');
          }}
          className="cursor-pointer"
        >
          {currentState === 'Sign Up' ? 'Login Here' : 'Create account'}
        </p>
      </div>

      <button
        className="bg-black text-white font-light px-8 py-2 mt-4"
        type="submit"
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
