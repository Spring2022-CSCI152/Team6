import React from 'react';
import './Header.css';


const Header = () => {
  return <div className='header'>
        <a class="home" href="#home">Home</a>
        <a href="#default">Page</a>
        <a href="#default">Page</a>
        <a href="#default">Page</a>
        <div class="right-nav">
            <a href="#default">Log In</a>
            <a href="#default">Log Out</a>
        </div>
  </div>;
};

export default Header;
