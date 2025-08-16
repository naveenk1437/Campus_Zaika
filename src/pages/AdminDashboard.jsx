import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const snapshot = await getDocs(collection(db, 'orders'));
      const data = snapshot.docs.map(doc => doc.data());
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, o) => sum + o.items.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-400 text-center">
          Admin Dashboard
        </h1>

        {loading ? (
          <p className="text-center text-lg">Loading data...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
              <p className="text-3xl font-bold">{totalOrders}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Items Sold</h2>
              <p className="text-3xl font-bold">{totalItems}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{totalRevenue}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
