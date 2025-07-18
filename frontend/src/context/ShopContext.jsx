import { createContext, useState } from 'react';

import { products } from '../assets/frontend_assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const deliveryFee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const navigate=useNavigate();

  const [cartItems, setCartItems] = useState({});
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Size not Selected');
      return null;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success('Added To Cart');
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item]) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    return totalCount;
  };
  const updateQuantity=async(id,size,quantity)=>{
          let copy=structuredClone(cartItems);
          copy[id][size]=quantity;
          setCartItems(copy);
  }
const getCartAmount = () => {
  let totalAmount = 0;

  if (!products || products.length === 0) {
    console.log("Products not loaded.");
    return 0;
  }

  for (const itemId in cartItems) {
    const sizes = cartItems[itemId]; 
    const itemInfo = products.find(product => product._id == itemId);

    if (!itemInfo) {
      toast.error(`Product not found for ID: ${itemId}`);
      continue;
    }

    for (const size in sizes) {
      const quantity = sizes[size]; 
      if (quantity > 0) {
        totalAmount += itemInfo.price * quantity;
      }
    }
  }

  return totalAmount;
};


  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
