import React, { useState } from 'react'
import Navbar from './componenets/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './componenets/Footer/Footer'
import AppDownload from './componenets/AppDownload/AppDownload'
import Login from './componenets/Login/Login'
import { ToastContainer } from 'react-toastify';
import MyOrders from './pages/MyOrders/MyOrders'


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <ToastContainer/>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className='app'> 
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<PlaceOrder/>}/>
          <Route path="/myorders" element={<MyOrders/>}/>
        </Routes> 
      </div>
      <AppDownload/>
      <Footer/>
    </>
  )
}

export default App