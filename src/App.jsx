import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Home from './Pages/Home'
import About from './Pages/About'
import Products from './Pages/Products'

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  )
}

export default App