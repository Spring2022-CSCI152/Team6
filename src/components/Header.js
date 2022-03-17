import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


const Header = () => {
  return <div className='header'>
        <Link to="/" className="home">Home</Link>
        <Link to="/Calendar" className="Calendar">Calendar</Link>
        <a href="#default">Page</a>
        <a href="#default">Page</a>
        <div className="right-nav">
          <Link to="/LogIn">Log In</Link>
          <Link to="/">Log Out</Link> {/*This link will need to be updated such that the token will be forfeited.  onClick=forfeit(tokenId).*/}

        </div>
  </div>;
};

export default Header;
