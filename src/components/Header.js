import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


const Header = () => {
  return <div className='header'>
        <a class="home" href="#home">Home</a>
        <a href="#default">Page</a>
        <a href="#default">Page</a>
        <a href="#default">Page</a>
        <div class="right-nav">
        <Link to='/Users/gurleenkaur/Desktop/Team6/src/pages/login.js'>Log In</Link>
            <a href="#default">Log Out</a>
        </div>
  </div>;
};

export default Header;
