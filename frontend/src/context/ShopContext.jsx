import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const currency = '$';
  const deliveryFee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size,setLoading) => {
    if (!token) {
      toast.error('Please login first');
      return false;
    }
    if (!size) {
      toast.error('Please select a size');
      return false;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${backend_url}/api/cart/add`,
        { itemId, size },
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.success) {
        setLoading(false);
        toast.success(response.data.message);
        getUserCartData(token);
        
        return true;
      } else {
        setLoading(false);
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message || error.message || 'Something went wrong'
      );
      return false;
    }
  };

  const getUserCartData = async (userToken) => {
    try {
      console.log("Getting cart data")
      const response = await axios.post(
        backend_url + '/api/cart/get',
        {},
        {
          headers: {
            token: userToken,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.cartData)
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
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

  const updateQuantity = async (itemId, size, quantity) => {
    let copy = structuredClone(cartItems);
    copy[itemId][size] = quantity;
    setCartItems(copy);
    if (token) {
      try {
        console.log('quantity is ' + quantity);
        const response = await axios.post(
          backend_url + '/api/cart/update',
          { itemId, size, quantity },
          {
            headers: {
              token,
            },
          }
        );
        if (response.data.success) {
          toast.success('Cart Updated Successfully');
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const getCartAmount = () => {
    let totalAmount = 0;

    if (!products || products.length === 0) {
      console.log('Products not loaded.');
      return 0;
    }

    for (const itemId in cartItems) {
      const sizes = cartItems[itemId];
      const itemInfo = products.find((product) => product._id == itemId);

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

  const getProductsData = async () => {
    try {
      const response = await axios.get(backend_url + '/api/product/list');

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // useEffect(() => {
  //   if (!token && localStorage.getItem('user_token')) {
  //     setToken(localStorage.getItem('user_token'));
  //     getUserCartData(localStorage.getItem('user_token'));
  //   }
  // }, [token]);
  // 1. Set token from localStorage (runs only once)
  useEffect(() => {
    const savedToken = localStorage.getItem('user_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // 2. When token updates, get the cart
  useEffect(() => {
    if (token) {
      getUserCartData(token);
    }
  }, [token]);

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
    navigate,
    backend_url,
    token,
    setToken,
    setCartItems,
    getUserCartData,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
