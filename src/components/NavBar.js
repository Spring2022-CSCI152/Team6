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

  //this might be needed if user is not navigated away from log-in page after success, because currently this component needs to re-render in order to update the logStatus state.  useEffect() would be able to change its state based on the token change, I think.
  // useEffect(() => {
  //   setLogStatus(1);
  // }, [localStorage.getItem('token')])


  //Changes the log in/out button to correctly represent the user's current status
  let logInOut = logStatus ? <Link to="/" onClick={deleteToken} className="right-nav">Log Out</Link> : <Link to="/LogIn" className="right-nav">Log In</Link>

  //Reveals the profile link based on log in status
  let profile = logStatus ? <Link to="/Profile">Profile</Link> : ""

  //Reveals degree plan link based on log-in status
  let degreePlan = logStatus ? <a href="#default">Degree Plan</a> : ""

  return <div className='NavBar'>
    <Link to="/" className="home">Home</Link>
    <Link to="/Calendar" className="Calendar">Calendar</Link>
    {profile}
    {degreePlan}

    {logInOut}

  </div>;
};

export default NavBar;
