import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import Header from './Header';

const ItemsCategory = ({ searchQuery, setSearchQuery, cartItems, setCartItems }) => {
  const itemList = ['All Items', 'Drinks', 'Fruit', 'Bakery'];
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetch('https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all')
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    let filtered = [];
    if (searchQuery) {
      setSelectedCategory('All Items');
      filtered = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      filtered = selectedCategory === 'All Items'
        ? items
        : items.filter(item => item.type.toLowerCase() === selectedCategory.toLowerCase());
    }
    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, items]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + '...';
    }
    return text;
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setFilteredItems(items);
    } else {
      setSelectedCategory(category);
    }
    setSearchQuery('');
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map(cartItem => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
    } else {
      const newCartItem = { ...item, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const handleRemoveFromCart = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
     <Header setSearchQuery={setSearchQuery} cartItems={cartItems}  />
      <div className='lg:mt-10 mt-3 flex gap-x-5 items-center'>
        {itemList.map((item, index) => (
          <div
            key={index}
            className={`px-3 lg:px-10 cursor-pointer font-semibold py-2 border ${
              selectedCategory === item
                ? 'bg-white shadow-xl shadow-gray-400'
                : 'bg-white border border-gray-400'
            } rounded-2xl drop-shadow-xl border border-gray-200 hover:drop-shadow-2xl`}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className='mt-10'>
        <h1 className='font-bold lg:text-3xl text-2xl'>Trending Items</h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className='bg-white p-5 relative h-60 lg:w-[500px] lg:h-[250px] border border-gray-200 flex gap-x-10 rounded-2xl shadow-lg'>
                <div className='absolute h-[150px] w-[150px] top-10'>
                  <img
                    src={item.img}
                    alt={item.name}
                    className='lg:w-full w-80 h-full rounded-md object-cover lg:max-h-fit lg:object-cover'
                  />
                </div>
                <div className='flex flex-col absolute right-7 w-1/2 h-full'>
                  <div className='flex flex-col'>
                    <h2 className='font-bold text-lg'>{item.name}</h2>
                    <p className='text-sm mt-5 mb-5'>{truncateText(item.description, 80)}</p>
                    {item.available >= 10 ? (
                      <p className='bg-green-500 shadow-md shadow-green-400 w-fit py-1 px-4 absolute bottom-24 text-white font-semibold text-sm rounded-full'>Available</p>
                    ) : (
                      <p className='bg-orange-400 shadow-md shadow-orange-300 w-fit py-1 px-4 absolute bottom-24 text-white font-semibold text-sm rounded-full'>
                        {item.available > 0 ? `Only ${item.available} left` : 'Not Available'}
                      </p>
                    )}
                  </div>
                  <div className='absolute bottom-10 flex w-full items-center'>
                    <p className='font-bold text-lg'>{item.price}</p>
                    <p className='absolute right-2'><AiOutlineHeart className='h-7 w-7 text-gray-400 cursor-pointer' /></p>
                    <p className='absolute right-14'>
                      <AiOutlineShoppingCart
                        className={`h-7 w-7 text-gray-400 cursor-pointer ${cartItems.some(cartItem => cartItem.id === item.id) ? 'text-blue-500' : ''}`}
                        onClick={() =>{
    if (cartItems.some(cartItem => cartItem.id === item.id)) {
      handleRemoveFromCart(item);
    } else {
      handleAddToCart(item);
    }
  }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center'>No items found.</div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default ItemsCategory;
