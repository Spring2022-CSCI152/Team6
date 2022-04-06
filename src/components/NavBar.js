import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/NavBar.css';



const NavBar = () => {

  const [logStatus, setLogStatus] = React.useState(localStorage.getItem('token'))

  //delete the json web token on logout
  const deleteToken = () => {
    localStorage.removeItem('token');
    setLogStatus(null);
  }

  // useEffect()
  // const token = localStorage.getItem('token');

  // console.log("token", token);

  //Changes the log in/out button to correctly represent the user's current status
  let logInOut = logStatus ? <Link to="/" onClick={deleteToken}>Log Out</Link> : <Link to="/LogIn">Log In</Link>

  //Reveals the profile link based on log in status
  let profile = logStatus ? <Link to="/Profile">Profile</Link> : ""

  return <div className='NavBar'>
    <Link to="/" className="home">Home</Link>
    <Link to="/Calendar" className="Calendar">Calendar</Link>
    {profile}

    <a href="#default">Page</a>
    <div className="right-nav">
      {logInOut}
      {/* <Link to="/LogIn">Log In</Link> */}
      {/* <Link to="/" onClick={deleteToken}>Log Out</Link> This link will need to be updated such that the token will be forfeited.  onClick=forfeit(tokenId). */}

    </div>
  </div>;
};

export default NavBar;
