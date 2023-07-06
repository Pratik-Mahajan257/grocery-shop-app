import React from 'react'
import { AiFillHeart,AiOutlineShoppingCart } from 'react-icons/ai'
import  Avatar  from '../assets/avatar.png'

const Header = () => {
  return (
    <div className=' flex items-center gap-x-4 lg:gap-x-28      '>
      <p className='font-bold uppercase text-lg '>Groceries</p>
      <div>
        <input type="text" placeholder='Search' className=' shadow-md shadow-gray-400 px-3 lg:px-4  py-3 outline-none rounded-2xl   border border-gray-200 lg:w-[700px]  ' />
      </div>
      <div className='gap-x-2 lg:gap-x-5 flex items-center  '>
        <p className='flex items-center  h-14   '><AiFillHeart className='h-7 w-7 lg:h-10 lg:w-10 text-red-600' />
        <span className='bg-red-500 rounded-full mb-8    lg:mb-12 flex items-center justify-center lg:h-5 lg:w-5     h-4 w-4 text-[10px]      '>0</span>
        </p>
        <p className='flex w-8 lg:w-12 '>
        <img src={Avatar} alt="/" className='h-8 w-8 mt-2 lg:h-14 lg:w-14 ' />
        </p>
            
        <p  className='flex items-center  h-14  '><AiOutlineShoppingCart className='h-7 w-7 lg:h-10 lg:w-10 ' />
        <span className='bg-blue-500 rounded-full mb-8 lg:mb-12 flex items-center justify-center lg:h-5 lg:w-5     h-4 w-4 text-[10px]      '>0</span>
        </p>
      </div>
     
    </div>
  )
}

export default Header
