import { useState } from 'react';
import Header from './Header';
import { AiOutlineClose } from 'react-icons/ai';

const Checkout = ({ cartItems, setCartItems }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleRemoveItem = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
  };

const handleIncreaseQuantity = (item) => {
  if (item.quantity < item.available) {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);

    // Check if the added item is a croissant
    if (item.name === 'Croissants') {
      const croissantCount = item.quantity ;
      const coffeeItem = cartItems.find((item) => item.name === 'Coffee');

      // Check if the croissant count is a multiple of 3
      if (croissantCount === 3) {
        if (!coffeeItem) {
          const updatedCoffeeItem = {
            id: 'coffee-item-id', 
            name: 'Coffee',
            price: '£2.99', 
            quantity: 1,
            img: 'https://py-shopping-cart.s3.eu-west-2.amazonaws.com/coffee.jpeg',
            available: 10, 
          };
          setCartItems([...cartItems, updatedCoffeeItem]);
        }
      }
    }
  }
};




  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
    }
  };

const calculateSubtotal = () => {
  return cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace(/[^\d.-]/g, '')); 
    return total + itemPrice * item.quantity;
  }, 0).toFixed(2);
};

const calculateDiscount = () => {
  let discount = 0;

  // Offer 1: Buy 6 cans of Coca-Cola and get one free
  const cokeItem = cartItems.find((item) => item.name === 'Coca-Cola');
  if (cokeItem) {
    const cokeItemCount = cokeItem.quantity;
    const cokeOfferCount = Math.floor(cokeItemCount / 6);
    const cokeItemPrice = parseFloat(cokeItem.price.replace(/[^\d.-]/g, ''));
    discount += cokeOfferCount * cokeItemPrice;
  }

  // Offer 2: Buy 3 croissants and get a discount on coffee
  const croissantItem = cartItems.find((item) => item.name === 'Croissants');
  const coffeeItem = cartItems.find((item) => item.name === 'Coffee');
  if (croissantItem && coffeeItem) {
    const croissantCount = croissantItem.quantity;
    const coffeeQuantity = coffeeItem.quantity;
    if (croissantCount >= 3 && coffeeQuantity >= 1) {
      discount += 2.99;
    }
  }

  return discount.toFixed(2);
};


const calculateTotal = () => {
  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  return (subtotal - discount).toFixed(2);
};



  return (
    <div>
      <Header setSearchQuery={setSearchQuery} cartItems={cartItems} />
      <h1 className='font-bold lg:mt-10 mt-5 lg:mb-20 lg:text-3xl text-2xl'>Checkout</h1>
      <div className='mt-5'>
        {cartItems.length > 0 ? (
          <div className='relative'>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className='bg-white flex-col p-5 relative h-[120px] lg:ml-10 mb-10 lg:w-2/3  lg:h-[100px] border border-gray-200 flex gap-x-10 rounded-2xl shadow-lg'
              >
                <h2 className='font-bold text-xl w-fit absolute left-1/3 lg:left-[20%]  lg:top-1/4     '>
                  {item.name}
                </h2>
                <div className='absolute h-[90px] w-[90px] lg:h-[70px]  lg:w-[70px] top-4  '>
                  <img
                    src={item.img}
                    alt={item.name}
                    className='lg:w-full w-80 h-full lg:ml-6 rounded-md object-cover lg:max-h-fit lg:object-cover'
                  />
                </div>
                <p className='absolute bottom-1/3 lg:right-0 lg:flex lg:justify-center lg:top-8      left-2/3 '>
                  {item.price}
                </p>
                {item.available >= 10 ? (
                  <p></p>
                ) : (
                  <p className='bg-orange-400 shadow-md shadow-orange-300 w-fit px-2 flex justify-center items-center lg:relative lg:ml-52 lg:mt-16  absolute left-1/3 bottom-5 text-white font-semibold text-[10px] rounded-full'>
                    {item.available > 0 ? `Only ${item.available} left` : 'Not Available'}
                  </p>
                )}
                <div className='absolute flex justify-center lg:left-[60%]   lg:top-5  items-center  gap-x-3 left-1/3  bottom-1/3'>
                  <button
                    className='bg-red-500 text-white h-5 w-5 flex justify-center items-center  rounded'
                    onClick={() => handleDecreaseQuantity(item)}
                  >
                    -
                  </button>
                  <p className='font-bold'>{item.quantity}</p>
                  <button
                    className='bg-green-500 text-white h-5 w-5 flex justify-center items-center  rounded'
                    onClick={() => handleIncreaseQuantity(item)}
                  >
                    +
                  </button>
                </div>
                <button
                  className='bg-green-500 absolute right-3 top-2 text-white p-1 h-5 flex items-center justify-center w-5 rounded text-sm'
                  onClick={() => handleRemoveItem(item)}
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}

            <div className='flex flex-col justify-center relative items-center'>
              <div className='border-t-2 border-gray-300 py-8 w-full flex justify-center items-center '>
                <p className='font-bold absolute left-1/3'>Subtotal </p>
                <p className='absolute left-2/3'>{calculateSubtotal()}</p>
              </div>
              <div className='border-t-2 border-gray-300 py-8 w-full flex justify-center items-center '>
                <p className='font-bold absolute left-1/3'>Discount </p>
                <p className='absolute left-2/3'>{calculateDiscount()}</p>
              </div>
              <div className='border-y-2 border-gray-300 py-8 w-full flex gap-x-7 justify-center items-center '>
                <p className='font-bold absolute left-1/3'>Total </p>
                <p className='absolute left-2/3'>{calculateTotal()}</p>
                <button className='bg-green-500 text-white px-3 py-1 absolute right-0 rounded flex justify-end items-end'>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>No items in the cart.</div>
        )}
      </div>
    </div>
  );
};

export default Checkout;