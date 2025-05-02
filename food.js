import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const foodData = [
  {
    id: 1,
    name: 'Jollof Rice',
    description: 'Spicy rice with tomato sauce and vegetables',
    price: 1500,
    image: 'https://www.allnigerianrecipes.com/wp-content/uploads/jollof-rice.jpg'
  },
  {
    id: 2,
    name: 'Egusi Soup',
    description: 'Melon seed soup with assorted meat',
    price: 2000,
    image: 'https://www.allnigerianrecipes.com/wp-content/uploads/egusi-soup.jpg'
  },
  {
    id: 3,
    name: 'Fried Plantain',
    description: 'Crispy fried ripe plantains',
    price: 800,
    image: 'https://www.allnigerianrecipes.com/wp-content/uploads/fried-plantain.jpg'
  },
  {
    id: 4,
    name: 'Grilled Turkey',
    description: 'Juicy grilled turkey pieces',
    price: 2500,
    image: 'https://cheflolaskitchen.com/wp-content/uploads/2021/12/Grilled-Turkey-Cheflolaskitchen.com_-500x375.jpg'
  },
  {
    id: 5,
    name: 'Fried Chicken',
    description: 'Crispy golden-brown fried chicken',
    price: 2200,
    image: 'https://cheflolaskitchen.com/wp-content/uploads/2022/09/Fried-Chicken-Recipe-ChefLolasKitchen.com-1-480x270.jpg'
  },
  {
    id: 6,
    name: 'Pounded Yam & Ogbono Soup',
    description: 'Smooth pounded yam served with ogbono soup',
    price: 2300,
    image: 'https://www.allnigerianrecipes.com/wp-content/uploads/ogbono-soup.jpg'
  },
  {
    id: 7,
    name: 'Moi Moi',
    description: 'Steamed bean pudding with egg and fish',
    price: 1000,
    image: 'https://www.allnigerianrecipes.com/wp-content/uploads/moimoi.jpg'
  },
  {
    id: 8,
    name: 'Efo Riro',
    description: 'Vegetable soup with assorted meats and spices',
    price: 2000,
    image: 'https://cheflolaskitchen.com/wp-content/uploads/2021/05/Efo-Riro-Nigerian-Spinach-Stew-Chef-Lolas-Kitchen-4.jpg'
  },
  {
    id: 9,
    name: 'Ofada Rice & Ayamase',
    description: 'Native rice served with spicy green pepper sauce',
    price: 2600,
    image: 'https://cheflolaskitchen.com/wp-content/uploads/2023/07/Ofada-Rice-and-Ayamase-768x1024.jpg'
  },
  {
    id: 10,
    name: 'Okra Soup',
    description: 'Slimy soup with okra and assorted meat',
    price: 1900,
    image: 'https://www.allnigerianrecipes.com/wp-content/uploads/okra-soup.jpg'
  }
];

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
          <Card key={item.id} className="shadow-lg">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-2xl" />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">₦{item.price}</span>
                <Button onClick={() => addToCart(item)} className="rounded-full px-4 py-2 text-sm">
                  <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={() => setShowCart(!showCart)} className="fixed bottom-6 right-6 rounded-full bg-primary text-white px-6 py-3 shadow-lg">
        View Cart ({cart.length})
      </Button>

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
                      <Button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1">-</Button>
                      <Button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1">+</Button>
                      <Button onClick={() => removeFromCart(item.id)} className="px-2 py-1 bg-red-500 text-white">Remove</Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex justify-between items-center">
              <span className="font-semibold">Total: ₦{total}</span>
              <Button className="bg-green-600 text-white px-4 py-2 rounded-lg">Checkout</Button>
            </div>
            <Button onClick={() => setShowCart(false)} className="mt-4 w-full">Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerMenu;
