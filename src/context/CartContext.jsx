import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Error loading cart:", err);
      return [];
    }
  });

  const [popup, setPopup] = useState({ message: "", visible: false });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item, qty = 1) => {
    if (!item?.id || !item?.name || typeof item.price !== "number") {
      console.warn("Invalid item passed:", item);
      return;
    }

    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      const updatedCart = exists
        ? prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + qty } : p)
        : [...prev, { ...item, qty }];

      setPopup({ message: `${qty} × ${item.name} added to cart`, visible: true });
      setTimeout(() => setPopup((p) => ({ ...p, visible: false })), 2000);

      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const increaseQty = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }, []);

  const decreaseQty = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        total,
      }}
    >
      {children}
      {popup.visible && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn z-50">
          {popup.message}
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
