
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SignUp from './pages/auth/signup'
import NavBar from './components/NavBar'
import Home from './pages/home/home'


function App() {
  return (
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>
    <>
    <NavBar />

    <BrowserRouter>
      <Routes>
        < Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
