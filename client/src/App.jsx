import { useState } from 'react'
import Home from './pages/Home'
import AddBlog from './pages/AddBlog'
import {Routes,Route} from 'react-router-dom'
import Header from './component/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
     <Header />
    <Routes>
    
      <Route path='/' element={<Home />} />
      <Route path='/addBlog' element={<AddBlog />} />
    </Routes>
   </div>
  )
}

export default App
