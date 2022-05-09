import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../CSS/NavBar.css';
import { getUserInfo } from './GetUserInfo';

const NavLink = ({ page, selected, extraClass }) => {

  var title = [...page.charAt(0).toUpperCase() + page.slice(1)];

  for (let i = 0; i < title.length; i++) {
    if (title[i] === '_') {
      title[i] = ' ';
      // if(title[i+1]) title[i+1]=title[i+1].toUpperCase;
    }
  }

  let classes = selected ? 'NavLink-Active' : 'NavLink';
  if (extraClass) classes += ' ' + extraClass;
  return <Link to={'/' + page} className={classes}>{title}</Link>
}



const NavBar = () => {

  const { page } = useParams();

  //state to track logged-in status
  const [logStatus, setLogStatus] = React.useState(localStorage.getItem('token'))

  //delete the json web token on logout
  const logOut = () => {

    //delete jwt
    localStorage.removeItem('token');

    //clear local storage
    localStorage.clear();

    //update lot status state
    setLogStatus(null);

    //navigate to home page
    window.location.href = "/";
  }

  //state and state change function for user object
  const [user, setUser] = useState({});

  //loads user info on mount and set user role to userAuthen
  useEffect(() => {

    async function getUserInfoWrapper() {

      //updates user state with user object from backend, matched by stored cookie id
      setUser(await getUserInfo());
    }

    getUserInfoWrapper();

  }, []);
  let userAuthen = user.role;

  //this might be needed if user is not navigated away from log-in page after success, because currently this component needs to re-render in order to update the logStatus state.  useEffect() would be able to change its state based on the token change, I think.
  // useEffect(() => {
  //   setLogStatus(1);
  // }, [localStorage.getItem('token')])

  //if users are not logged in, they will onlyy see log out button
  if (!logStatus) return <div className='NavBar'>
    <NavLink page='Home' selected={page === 'Home' || !page} />
    <NavLink page="LogIn" selected={page === 'LogIn'} extraClass='right-nav' />
  </div>;

  //if user have basic authentication, these are the pages they see
  let basicAuth = "basic" == userAuthen ?
    <>
      <NavLink page='Home' selected={page === 'Home' || !page} />
      <NavLink page='Calendar' selected={page === 'Calendar'} />
      <NavLink page="Profile" selected={page === 'Profile'} />
      <NavLink page="Roadmap" selected={page === 'Roadmap'} />
      <NavLink page='Courses' selected={page === 'Courses'} />
      {/* <NavLink page='SearchCourse' selected={page === 'SearchCourse'} /> */}

    </>
    : ""
  //if user have admin auth, these are what they see
  let adminAuth = "admin" == userAuthen ?
    <>
      <NavLink page='Home' selected={page === 'Home' || !page} />
      <NavLink page='Calendar' selected={page === 'Calendar'} />
      <NavLink page="Profile" selected={page === 'Profile'} />
      <NavLink page="Roadmap" selected={page === 'Roadmap'} />
      <NavLink page='Courses' selected={page === 'Courses'} />
      <NavLink page="Add_Course" selected={page === 'Add_Course'} />


    </>
    : " "

  return <div className='NavBar'>

    {basicAuth}
    {adminAuth}
    <Link to="/" onClick={logOut} className="right-nav">Log Out</Link>
  </div>;

};

export default NavBar;
