import { useState } from 'react'
import Header from './Header';
import { AiOutlineClose } from 'react-icons/ai'

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
      return total + item.price * item.quantity;
    }, 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * 0.1; // Assuming 10% discount
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  return (
    <div>
 <Header setSearchQuery={setSearchQuery} cartItems={cartItems}  />
      <h1 className='font-bold lg:mt-10 mt-5 lg:mb-20 lg:text-3xl text-2xl'>Checkout</h1>
      <div className='mt-5'>
        {cartItems.length > 0 ? (
          <div className='relative'>
            {cartItems.map((item) => (
              <div key={item.id} className='bg-white flex-col p-5 relative h-[120px] lg:ml-10 mb-10 lg:w-2/3  lg:h-[100px] border border-gray-200 flex gap-x-10 rounded-2xl shadow-lg'>
              <h2 className='font-bold text-xl w-fit absolute left-1/3 lg:left-[20%]  lg:top-1/4     '>{item.name}</h2>
                <div className='absolute h-[90px] w-[90px] lg:h-[70px]  lg:w-[70px] top-4  '>
                  
                  <img
                    src={item.img}
                    alt={item.name}
                    className='lg:w-full w-80 h-full lg:ml-6 rounded-md object-cover lg:max-h-fit lg:object-cover'
                  />
                  
                </div>
                <p className='absolute bottom-1/3 lg:right-0 lg:flex lg:justify-center lg:top-8      left-2/3 '>{item.price}</p>
                
   {item.available >= 10 ? (
                      <p></p>
                    ) : (
                      <p className='bg-orange-400 shadow-md shadow-orange-300 w-fit px-2 flex justify-center items-center   absolute left-1/3 bottom-5 text-white font-semibold text-[10px] rounded-full'>
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
            <div className='font-semibold'>
              <p>Subtotal: {calculateSubtotal()}</p>
              <p>Discount: {calculateDiscount()}</p>
              <p>Total: {calculateTotal()}</p>
            </div>
            <button className='bg-blue-500 text-white px-3 py-1 rounded mt-3'>Checkout</button>
          </div>
        ) : (
          <div>No items in the cart.</div>
        )}
      </div>
    </div>
  );
};

export default Checkout;