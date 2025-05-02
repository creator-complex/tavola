import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import foodData from './foodData';

const CustomerMenu = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, amount) => {
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity: Math.max(item.quantity + amount, 1) } : item
    ));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="relative">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {foodData.map((item) => (
          <div key={item.id} className="shadow-lg rounded-2xl overflow-hidden bg-white">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">₦{item.price}</span>
                <button onClick={() => addToCart(item)} className="rounded-full bg-blue-500 text-white px-4 py-2 text-sm flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setShowCart(!showCart)} className="fixed bottom-6 right-6 rounded-full bg-primary text-white px-6 py-3 shadow-lg">
        View Cart ({cart.length})
      </button>

      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map(item => (
                  <li key={item.id} className="flex justify-between items-center mb-3">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm">₦{item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200">-</button>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 bg-gray-200">+</button>
                      <button onClick={() => removeFromCart(item.id)} className="px-2 py-1 bg-red-500 text-white">Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex justify-between items-center">
              <span className="font-semibold">Total: ₦{total}</span>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Checkout</button>
            </div>
            <button onClick={() => setShowCart(false)} className="mt-4 w-full bg-gray-300 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerMenu;