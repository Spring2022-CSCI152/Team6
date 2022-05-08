import React, { useState, useEffect } from 'react';
import './CSS/App.css'
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Course from './pages/Course';
import { getUserInfo } from './components/GetUserInfo';


function App() {

  //state and state change function for user object
  const [user, setUser] = useState({});

  //loads user info on mount and sets user role to userAuthen
  useEffect(() => {

    async function getUserInfoWrapper() {

      //updates user state with user object from backend, matched by stored cookie id
      setUser(await getUserInfo());
    }

    getUserInfoWrapper();

  }, []);

  let userAuthen = user.role;

  console.log(userAuthen)

  function BasicRoute({ children, ...rest }) {

    console.log(children)

    return (<Route exact path="/test" element={<Navigate to='/home' />} />)

    // return (
    //   <Route {...rest} render={() => {
    //     return userAuthen == "basic"
    //       ? children
    //       : <Navigate to='/home' />
    //   }} />
    // )
  }

  function AdminRoute({ children, ...rest }) {

    return (
      <Route {...rest} render={() => {
        return userAuthen == "admin"
          ? children
          : <Navigate to='/home' />
      }} />
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="/:page" element={<NavBar />} />
          <Route path="/course/:course" element={<NavBar />} />
        </Routes >
        <Routes>
          {/* Both basic and admin routes under here */}
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/Home" element={<HomePage />} />

          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/editProfile" element={<EditProfile />} />
          <Route exact path="/LogIn" element={<LogIn />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Courses" element={<Courses />} />
          <Route exact path="/Course/:courseId" element={<Course/>} />
          {/* <Route exact path="/SearchCourse" element={<SearchCourse />} /> */}
          <Route exact path="/Calendar" element={<Calendar1 />} />
          <Route exact path="/Roadmap" element={<Roadmap />} />

          {/* Basic routes under here
          <BasicRoute exact path="/RecordList"><RecordList /></BasicRoute>
          <BasicRoute exact path="/Calendar"><Calendar1 /></BasicRoute>
          <BasicRoute exact path="/SearchCourse"><SearchCourse /></BasicRoute>
          <BasicRoute exact path="/Courses"><Courses /></BasicRoute>
          <BasicRoute exact path="/Roadmap"><Roadmap /></BasicRoute>
          <BasicRoute exact path="/Reminders"><Reminders /></BasicRoute>

          admin routes under here
          <AdminRoute exact path="/add Class"><AddClass /></AdminRoute>
          <AdminRoute exact path="/editClass"><EditClass /></AdminRoute>
          <AdminRoute exact path="/Search Course"><SearchCourseAdmin /></AdminRoute>
          <AdminRoute exact path="/CoursesParser"><CoursesParser /></AdminRoute>
          <AdminRoute exact path="/CoursesForAdmin"><CoursesForAdmin /></AdminRoute> */}

          {/* <Navigate from="*" to="/" /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;