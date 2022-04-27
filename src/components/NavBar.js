import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../CSS/NavBar.css';


const NavLink = ({ page, selected, extraClass }) => {
  const title = page.charAt(0).toUpperCase() + page.slice(1);
  let classes = selected ? 'NavLink-Active' : 'NavLink';
  if (extraClass) classes += ' ' + extraClass;
  return <Link to={'/' + page} className={classes}>{title}</Link>
}

const NavBar = () => {

  const { page } = useParams();
  // console.log(page);

  //state to track logged-in status
  const [logStatus, setLogStatus] = React.useState(localStorage.getItem('token'))

  //delete the json web token on logout
  const logOut = () => {

    //delete jwt
    localStorage.removeItem('token');

    //update lot status state
    setLogStatus(null);

    //navigate to home page
    window.location.href = "/";
  }

  //this might be needed if user is not navigated away from log-in page after success, because currently this component needs to re-render in order to update the logStatus state.  useEffect() would be able to change its state based on the token change, I think.
  // useEffect(() => {
  //   setLogStatus(1);
  // }, [localStorage.getItem('token')])


  //Changes the log in/out button to correctly represent the user's current status
  let logInOut = logStatus ? <Link to="/" onClick={logOut} className="right-nav">Log Out</Link> : <NavLink page="LogIn" selected={page === 'LogIn'} extraClass='right-nav' />

  //Reveals the profile link based on log in status
  let profile = logStatus ? <NavLink page="Profile" selected={page === 'Profile'} /> : ""

  //Reveals degree plan link based on log-in status
  let degreePlan = logStatus ? <NavLink page="Roadmap" selected={page === 'Roadmap'} /> : ""
  

  return <div className='NavBar'>

    <NavLink page='Home' selected={page === 'Home' || !page} />
    <NavLink page='Calendar' selected={page === 'Calendar'} />
    {profile}
    {degreePlan}

    {logInOut}
    <NavLink page='Courses' selected={page === 'Courses'} />
    <NavLink page='SearchCourse' selected={page === 'SearchCourse'} />
    <NavLink page='Reminders' selected={page === 'Reminders'} />

  </div>;
};

export default NavBar;
