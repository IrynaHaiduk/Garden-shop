import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import "./Header.scss";

const Header = () => {
  return (
    <header className='header'>
      <div className="container">
         <Navbar/>
      </div>
    </header>
  )
}

export default Header
