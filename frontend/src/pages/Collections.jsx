import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title.jsx';
import ProductItems from '../components/ProductItems.jsx';

const Collections = () => {
  const { products ,search,showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType,setSortType]=useState('relevant')

  const toggleCattegory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    }else{
       setCategory(prev=> [...prev,e.target.value])
    }
  };
useEffect(() => {
  let productsCopy = [...products];

   if(showSearch&& search){
    productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
   }
  // Apply category filter
  if (category.length > 0) {
    productsCopy = productsCopy.filter(item => category.includes(item.category));
  }

  // Apply subCategory filter
  if (subCategory.length > 0) {
    productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
  }

  // Apply sorting
  switch (sortType) {
    case 'low-high':
      productsCopy.sort((a, b) => a.price - b.price);
      break;
    case 'high-low':
      productsCopy.sort((a, b) => b.price - a.price);
      break;
    default:
      break; // "relevant" or default, no sorting
  }

  setFilteredProducts(productsCopy);
}, [category, subCategory, sortType, products,search,showSearch]);



  const toggleSubCattegory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    }else{
       setSubCategory(prev=> [...prev,e.target.value])
    }
  };


  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* {Filters Section} */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            alt=""
          />
        </p>
        {/* CATEGORY FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Men'}  onChange={toggleCattegory} /> Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Women'} onChange={toggleCattegory} /> Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Kids'} onChange={toggleCattegory} /> Kids
            </p>
          </div>
        </div>
        {/* SUBCATEGORY FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" onChange={toggleSubCattegory} className="w-3" value={'Topwear'} />{' '}
              Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" onChange={toggleSubCattegory} className="w-3" value={'Bottomwear'} />{' '}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" onChange={toggleSubCattegory} className="w-3" value={'Winterwear'} />{' '}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTION'} />

          <select onChange={(e)=>setSortType(e.target.value)} className="border border-gray-300 text-sm p-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item, index) => (
            <ProductItems
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
