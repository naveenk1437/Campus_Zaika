import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ item }) => {
    const { addToCart } = useCart();

    return (
        <div className="border p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-sm">₹{item.price}</p>
            <button
                onClick={() => addToCart(item)}
                className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
