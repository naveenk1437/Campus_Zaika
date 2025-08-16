import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ADMIN_EMAILS = ["admin@zaika.com"];

const Admin = () => {
  const { user } = useAuth();
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Snacks");
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch existing menu items
  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "menu"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(data);
  };

  useEffect(() => {
    if (isAdmin) fetchItems();
  }, [isAdmin]);

  // Handle item submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert("Please fill all fields and select an image");
      return;
    }
    setLoading(true);

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `menu/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Save item in Firestore
      await addDoc(collection(db, "menu"), {
        name,
        price: parseFloat(price),
        category,
        image: imageUrl,
        createdAt: new Date(),
      });

      alert("Item added successfully!");
      setName("");
      setPrice("");
      setCategory("Snacks");
      setImage(null);
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item");
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="text-center text-yellow-600 font-medium p-6">
        ⚠️ Please login to access the admin panel.
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="text-center text-red-600 font-medium p-6">
        ❌ Access Denied: You do not have admin permissions.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 dark:bg-gray-900 text-black dark:text-white px-4 py-10">
      <div className="max-w-4xl mx-auto border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400">
          Admin Panel
        </h1>

        {/* Add Item Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <input
            type="text"
            placeholder="Item Name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Snacks</option>
            <option>Drinks</option>
            <option>Desserts</option>
            <option>Main Course</option>
          </select>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700"
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>

        {/* Items List */}
        <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 bg-gray-100 dark:bg-gray-700"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{item.name}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                ₹{item.price} - {item.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
