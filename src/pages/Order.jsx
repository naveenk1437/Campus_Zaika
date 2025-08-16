import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { triggerRazorpay } from "../utils/razorpay";

const Order = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();

  if (cartItems.length === 0) {
    return (
      <p className="text-center mt-16 text-gray-500 dark:text-gray-400 text-lg">
        Your cart is empty 🛒
      </p>
    );
  }

  const handlePayment = () => {
    triggerRazorpay({
      amount: total,
      user,
      onSuccess: (response) => {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        clearCart();
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Your Order
      </h2>

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 dark:border-gray-700 py-4"
          >
            {/* Image & Name */}
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <img
                src={item.imageUrl || item.image || "https://via.placeholder.com/60"}
                alt={item.name || "No Name"}
                className="w-16 h-16 rounded-lg object-cover shadow-sm"
              />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{item.name || "Unnamed Item"}</h3>
                <p className="text-gray-500 dark:text-gray-400">₹{item.price || 0}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <button
                onClick={() => decreaseQty(item.id)}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                −
              </button>
              <span className="min-w-[24px] text-center text-gray-800 dark:text-white font-medium">
                {item.qty}
              </span>
              <button
                onClick={() => increaseQty(item.id)}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                +
              </button>
            </div>

            {/* Price & Remove */}
            <div className="flex items-center gap-4 justify-between md:justify-end">
              <p className="font-semibold text-gray-800 dark:text-white">₹{(item.price || 0) * item.qty}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Total & Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-3">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Total: ₹{total}</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              Clear Cart
            </button>
            <button
              onClick={handlePayment}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
