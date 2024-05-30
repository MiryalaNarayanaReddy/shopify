
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


function App() {
  const [selectedNavItem, setSelectedNavItem] = useState(''); // Shop, Men, Women, Kids

  useEffect(() => {

    const category = localStorage.getItem('category');

    if (category === null) {
      setSelectedNavItem('shop');
    }
    else {
      setSelectedNavItem(category);
    }
  }
    , []);

  // get url params

  return (
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>
    <>
      <NavBar selectedNavItem={selectedNavItem}/>

      <BrowserRouter>
        <Routes>
          < Route path="/" element={<Home />} />
          <Route path="/collections/:category" element={<CollectionPage />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

        </Routes>
      </BrowserRouter>
      {

      localStorage.getItem('admin')?
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

