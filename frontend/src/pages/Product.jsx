import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';


const Product = () => {



  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const { products, currency,addToCart } = useContext(ShopContext);
  const[loading,setLoading]=useState(false);
  



  useEffect(() => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProduct(item);
      setMainImage(item.image[0]);
    }
  }, [productId, products]);



  
  return product ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-betweeen sm:justify-normal sm:w-[18.7%] w-full">
            {product?.image?.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setMainImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={mainImage} alt="" />
          </div>
        </div>
        {/* PRODUCT INFO */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {product?.sizes?.map((size, index) => (
                <button
                  className={`border py-2 px-4 bg-gray-100 cursor-pointer ${
                    selectedSize == size ? 'border-orange-500' : ''
                  }`}
                  onClick={() => setSelectedSize(size)}
                  key={index}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button disabled={loading} onClick={()=>addToCart(product._id,selectedSize,setLoading)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer">
           {loading?"Adding to Cart":"ADD TO CART"}
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui autem aut doloremque laboriosam atque excepturi, debitis id nulla dolor in maiores vel rerum perferendis dicta cumque nihil illum unde consequuntur. Libero saepe, in doloribus perferendis itaque deleniti iste cum nulla!</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis aperiam magni dolore earum. Molestias similique dolor voluptates tenetur iusto corporis voluptatum voluptate consequuntur dolore unde. Minima perspiciatis corporis aperiam, error nisi molestias similique aliquam.
        </p>
        </div>
      </div>


 <RelatedProducts category={product.category} subCategory={product.subCategory}/>





    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
