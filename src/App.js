import React, { useState, useEffect } from 'react';
import './CSS/App.css'
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import LogIn from './pages/login';
import Signup from './pages/signup';
import RecordList from './components/RecordList';
import CoursesParser from './pages/Admin/CoursesParser';
import Calendar1 from './pages/calendar';
import SearchCourse from './pages/SearchCourse';
import Courses from './pages/Courses';
import CoursesForAdmin from './pages/CoursesForAdmin';
import Roadmap from './pages/Roadmap';
import Reminders from './pages/Reminder';
import EditProfile from './pages/editProfile';
import AddClass from './pages/Admin/addClass'
import EditClass from './pages/Admin/editClass'
import SearchCourseAdmin from './pages/Admin/SearchCourseAdmin'
import { getUserInfo } from './components/GetUserInfo';

//state and state change function for user object

function App() {

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

  console.log(userAuthen)

  function BasicRoute ({children, ...rest}) {
    
    return(
      <Route {...rest} render={() => {
        return userAuthen == "basic"
          ? children
          : <Redirect to='/home' />
      }}/>
    )
  }
  
  function AdminRoute ({children, ...rest}) {
    
    return(
      <Route {...rest} render={() => {
        return userAuthen == "admin"
          ? children
          : <Redirect to='/home' />
      }}/>
    )
  }

  return (
    <>
      <Router forceRefresh={false}>
        <Switch>
          <Route exact path={["/", "/:page"]}><NavBar /></Route>
        </Switch >
        <Switch>
          {/*Both basic and admin routes under here*/}
          <Route exact path={["/", "/Home"]}><HomePage /></Route>
          
          <Route exact path="/Profile"><Profile /></Route>
          <Route exact path="/LogIn"><LogIn /></Route>
          <Route exact path="/Signup"><Signup /></Route>
          {/*Basic routes under here*/}
          <BasicRoute exact path="/RecordList"><RecordList /></BasicRoute>
          <BasicRoute exact path="/CoursesParser"><CoursesParser /></BasicRoute>
          <BasicRoute exact path="/Calendar"><Calendar1 /></BasicRoute>
          <BasicRoute exact path="/SearchCourse"><SearchCourse /></BasicRoute>
          <BasicRoute exact path="/Courses"><Courses /></BasicRoute>
          <BasicRoute exact path="/CoursesForAdmin"><CoursesForAdmin /></BasicRoute>
          <BasicRoute exact path="/Roadmap"><Roadmap /></BasicRoute>
          <BasicRoute exact path="/Reminders"><Reminders /></BasicRoute>
          <BasicRoute exact path="/editProfile"><EditProfile /></BasicRoute>

          {/*admin routes under here*/}
          <AdminRoute exact path="/add Class"><AddClass /></AdminRoute>
          <AdminRoute exact path="/editClass"><EditClass /></AdminRoute>
          <AdminRoute exact path="/Search Course"><SearchCourseAdmin/></AdminRoute>

          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;