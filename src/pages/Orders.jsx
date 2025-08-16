import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const snapshot = await getDocs(collection(db, 'orders'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-yellow-100 dark:bg-gray-900 text-black dark:text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">All Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md"
              >
                <p className="font-bold text-lg mb-2">🧾 Order ID: <span className="font-mono">{order.id}</span></p>
                <p className="mb-1">📧 <strong>User:</strong> {order.user?.email}</p>
                <p className="mb-2">💰 <strong>Total:</strong> ₹{order.total}</p>
                <div className="mb-2">
                  <p className="font-medium">🍽 Items Ordered:</p>
                  <ul className="list-disc list-inside ml-4 text-sm">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.qty}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">🔐 Razorpay Payment ID: {order.razorpay_payment_id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
