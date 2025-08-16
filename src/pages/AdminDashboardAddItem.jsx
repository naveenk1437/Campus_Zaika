import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AdminDashboardAddItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Snacks");
  const [imageUrl, setImageUrl] = useState("");
  const [rating, setRating] = useState("");
  const [available, setAvailable] = useState(true);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !imageUrl || !rating || !description) {
      return alert("Please fill all fields.");
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "menu"), {
        name,
        price: Number(price),
        category,
        image: imageUrl,
        rating: Number(rating),
        available,
        description,
        createdAt: serverTimestamp(),
      });

      alert("✅ Menu item added successfully!");
      setName("");
      setPrice("");
      setCategory("Snacks");
      setImageUrl("");
      setRating("");
      setAvailable(true);
      setDescription("");
    } catch (err) {
      console.error("Error adding menu item:", err);
      alert("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Add Menu Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-white-10 dark:text-gray-300 ">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Snacks">Snacks</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Rating (1-5)
            </label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              step="0.1"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Availability
            </label>
            <select
              value={available}
              onChange={(e) => setAvailable(e.target.value === "true")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description..."
              rows="3"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition-colors duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboardAddItem;
