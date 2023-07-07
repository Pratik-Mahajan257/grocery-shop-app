import { useState } from 'react'

import Header from './components/Header'
import ItemsCategory from './components/ItemsCategory'


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
   <div className=' lg:my-10 lg:mx-40 m-3 '>
<Header setSearchQuery={setSearchQuery} />
<ItemsCategory searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

   </div>
    
  )
}

export default App
