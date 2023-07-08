import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Checkout from './components/Checkout'
import ItemsCategory from './components/ItemsCategory';

const App = () => {
const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  return (
   <div className=' lg:my-10 lg:mx-40 m-3 '>

   <Routes>
   
      <Route path='/' element={<ItemsCategory searchQuery={searchQuery} setSearchQuery={setSearchQuery} cartItems={cartItems} setCartItems={setCartItems} /> } />
      <Route path='/checkout' element={<Checkout cartItems={cartItems} setCartItems={setCartItems}  />} />

   </Routes>


   </div>
    
  )
}

export default App
