import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { currency, backend_url, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backend_url + '/api/order/userorders',
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        const reversedOrders = [...response.data.orders].reverse(); // Reverse order list
        setOrders(reversedOrders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {loading ? (
        <div className="text-center text-gray-500 mt-10">Loading your orders...</div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No orders found.</p>
      ) : (
        orders.map((order, orderIndex) => (
          <div key={orderIndex} className="mb-6 border-t pt-4">
            <div className="text-sm text-gray-500 mb-2">
              Order Date: {new Date(order.date).toLocaleDateString()}
            </div>

            {order.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  <img src={item.image[0]} alt={item.name} className="w-16 sm:w-20" />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p className="text-lg">
                        {currency}
                        {item.price}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="w-3 h-3 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{order.status}</p>
                  </div>
                  <button className="border px-4 py-2 text-sm font-medium rounded">
                    TRACK ORDER
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right text-sm text-gray-600 mt-2">
              Total: {currency}
              {order.amount}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
