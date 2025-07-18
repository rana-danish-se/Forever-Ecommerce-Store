import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Footor = () => {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      <div>
        <img src={assets.logo} alt="" className="mb-5 w-32" />
        <p className="w-full md:w-1/2 text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolorum
          debitis, sint beatae sequi repudiandae voluptates aut vero quo
          distinctio.
        </p>
      </div>

      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>HOME</li>
          <li>COLLECTION</li>
          <li>ABOUT</li>
          <li>CONTACT</li>
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+92-312-1615000</li>
          <li>ranadanish.se@gmail.com</li>
        </ul>
      </div>
      </div>
      <div>
        <hr  />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footor;
