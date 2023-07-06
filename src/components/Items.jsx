import React from 'react'

const Items = () => {
  return (
    <div className='mt-10 flex gap-x-5  items-center '>
      <div className='px-3 lg:px-10 cursor-pointer font-semibold  py-2 bg-red-200 bo rounded-2xl drop-shadow-lg  shadow-gray-600 hover:drop-shadow-xl      '>
        All Items
      </div>
       <div className='px-3 lg:px-10 cursor-pointer font-semibold  py-2 bg-red-200 bo rounded-2xl drop-shadow-lg  shadow-gray-600 hover:drop-shadow-xl      '>
        Drinks
      </div>
       <div className='px-3 lg:px-10 cursor-pointer font-semibold  py-2 bg-red-200 bo rounded-2xl drop-shadow-lg  shadow-gray-600 hover:drop-shadow-xl      '>
        Fruit
      </div>
       <div className='px-3 lg:px-10 cursor-pointer font-semibold  py-2 bg-red-200 bo rounded-2xl drop-shadow-lg  shadow-gray-600 hover:drop-shadow-xl      '>
        Bakery
      </div>
    </div>
  )
}

export default Items
