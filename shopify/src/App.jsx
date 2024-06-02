
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import SignUp from './pages/auth/signup'
import Login from './pages/auth/login'
import AdminLogin from './pages/auth/admin/login'
import AdminSignUp from './pages/auth/admin/signup'
import AdminDashboard from './pages/admin/adminDashboard'

import NavBar from './components/NavBar'
import Home from './pages/home/home'
import CollectionPage from './pages/collections/collection'
import { Footer } from './components/Banners'

import CartPage from './pages/collections/cartPage'

import axios from 'axios'
import { base_url } from './helper'
import Profile from './pages/auth/Profile'
import { jwtDecode } from 'jwt-decode'

function App() {
  const [selectedNavItem, setSelectedNavItem] = useState(''); // Shop, Men, Women, Kids
  const [cart, setCart] = useState({ products: [] }); // [{product_id: 1, quantity: 1, price_per_unit: 100}]

  useEffect(() => {

    const token = localStorage.getItem('token');



    if (token && jwtDecode(token).exp < Date.now() / 1000) {
      localStorage.clear();
    }


    const category = localStorage.getItem('category');

    if (category === null) {
      setSelectedNavItem('shop');
    }
    else {
      setSelectedNavItem(category);
    }

    try {

      axios.get(base_url + '/cart', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('cart', JSON.stringify(res.data));
          setCart(res.data);
        })
        .catch((err) => {
          console.log(err);
          setCart({ products: [] })
        });

      

    }
    catch (err) {
      setCart({ products: [] })
  
    }


    // console.log(cart);
  }
    , []);

  // get url params

  return (
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>
    <>
      <NavBar selectedNavItem={selectedNavItem} cart={cart} />

      <BrowserRouter>
        <Routes>
          < Route path="/" element={<Home />} />
          <Route path="/collections/:category" element={<CollectionPage cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </BrowserRouter>
      {

        localStorage.getItem('admin') ?
          <></> :
          <div className="w-full mt-16">
            <Footer />
          </div>

      }

      {/* 
       <div className="w-full mt-16">
         <Footer />
       </div> */}

    </>
  )
}

export default App;

