import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
  const { getCartAmount, currency, deliveryFee } = useContext(ShopContext);

  // ✅ Protect against null values
  if (!getCartAmount || typeof getCartAmount !== 'function') {
    return <p>Error: getCartAmount is not available.</p>;
  }

  const total = getCartAmount(); // ✅ Call once to avoid issues

  return (
    <div className='w-full'>
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{total}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{deliveryFee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{total === 0 ? 0 : total + deliveryFee}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
