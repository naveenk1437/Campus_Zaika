import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";

const Menu = () => {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItem, setExpandedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // NEW: search input state

  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  // Fetch menu from Firestore
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "menu"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMenuItems(items);

        const initialQuantities = {};
        items.forEach((item) => (initialQuantities[item.id] = 1));
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const increaseQuantity = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));

  const decreaseQuantity = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: prev[id] > 1 ? prev[id] - 1 : 1 }));

  const categories = ["All", ...new Set(menuItems.map((item) => item.category || "Misc"))];

  // Apply category + search filter
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading)
    return <div className="text-center py-10 text-gray-600 dark:text-gray-300">Loading menu...</div>;

  return (
    <div className="p-4 sm:p-6 bg-yellow-100 dark:bg-gray-900 min-h-screen">
      <img
        src="../chef-animation-unscreen.gif"
        alt="Chef Animation"
        className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 object-contain"
      />

      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-orange-600 dark:text-orange-400">
        Our Delicious Menu
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 
                     dark:text-white transition"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border font-medium transition-colors duration-300 ${
              selectedCategory === category
                ? "bg-green-600 text-white border-green-600"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No items found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const imgSrc = item.imageUrl || item.image || item.img || placeholderImage;
            const isExpanded = expandedItem === item.id;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 cursor-pointer"
                onClick={() => setExpandedItem(isExpanded ? null : item.id)}
              >
                <img
                  src={imgSrc}
                  alt={item.name || "Menu Item"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {item.name || "Unnamed Item"}
                  </h2>
                  <p className="font-bold text-lg text-gray-800 dark:text-white">
                    ₹{item.price ?? "N/A"}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>{item.category || "Misc"}</span>
                    <span>⭐ {item.rating ?? "N/A"}</span>
                    <span className={item.available ? "text-green-600" : "text-red-600"}>
                      {item.available ? "Available" : "Out of Stock"}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="mt-2 text-gray-600 dark:text-gray-300">
                      {item.description || "No description available."}
                    </div>
                  )}

                  {/* Add to Cart */}
                  <div className="flex gap-2 items-center mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          imageUrl: imgSrc,
                          quantity: quantities[item.id],
                        });
                      }}
                      disabled={!item.available}
                      className={`flex-1 py-2 px-4 rounded-lg text-white font-medium transition ${
                        item.available
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Menu;
