import React, { useState } from 'react';
import { AiFillHeart, AiOutlineShoppingCart, AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import Avatar from '../assets/avatar.png';

const Header = ({ setSearchQuery }) => { // Add setSearchQuery prop
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchInput(''); // Clear the search input
  };

  return (
    <div className='flex flex-col lg:flex-row items-center gap-x-3 lg:gap-x-28'>
      <p className='font-bold uppercase text-lg mb-2 lg:mb-0'>Groceries</p>
      <div className='flex  mb-2 lg:mb-0 shadow-md shadow-gray-400 items-center rounded-2xl'>
        <input
          type="text"
          placeholder='Search'
          className='bg-transparent px-3 lg:px-4 py-3 w-[350px]  outline-none lg:w-[700px]'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {searchInput && ( // Render clear search button only if there is a search input
          <button className='pr-4 cursor-pointer' onClick={handleClearSearch}>
            <AiOutlineClose className='h-5 w-5' />
          </button>
        )}
        <button className='pr-4 cursor-pointer' onClick={handleSearch}>
          <AiOutlineSearch className='h-5 w-5' />
        </button>
      </div>
      <div className='lg:gap-x-5 gap-x-10 flex items-center'>
        <p className='flex items-center h-14'>
          <AiFillHeart className='h-10 w-10 text-red-600' />
          <span className='bg-red-500 rounded-full mb-8 lg:mb-12 flex items-center justify-center lg:h-5 lg:w-5 h-4 w-4 text-[10px]'>
            0
          </span>
        </p>
        <p className='flex w-8 lg:w-12'>
          <img src={Avatar} alt="/" className=' mt-2 h-16 object-cover w-full   ' />
        </p>
        <p className='flex items-center h-14'>
          <AiOutlineShoppingCart className='h-10 w-10' />
          <span className='bg-blue-500 rounded-full mb-8 lg:mb-12 flex items-center justify-center lg:h-5 lg:w-5 h-4 w-4 text-[10px]'>
            0
          </span>
        </p>
      </div>
    </div>
  );
};

export default Header;
