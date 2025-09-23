import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import About from './components/pages/About.jsx';
import Contact from './components/pages/Contact.jsx';
import Services from './components/pages/Services.jsx';
import Navbar from './components/Navbar'
 
 
function App() {
 
  return (
    <>
      <div>
        <Navbar/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </BrowserRouter>
       
 
      </div>
    </>
  )
}
 
export default App
 