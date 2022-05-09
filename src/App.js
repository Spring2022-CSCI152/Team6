import React from 'react';
import './CSS/App.css'
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import LogIn from './pages/login';
import Signup from './pages/signup';
import RecordList from './components/RecordList';
import Calendar1 from './pages/calendar';
import Courses from './pages/Courses';
import Roadmap from './pages/Roadmap';
import Reminders from './pages/Reminder';
import EditProfile from './pages/editProfile';
import AddCourse from './pages/Admin/AddCourse'
import EditClass from './pages/Admin/editClass'
import Course from './pages/Course';
import { BasicRoutes, AdminRoutes } from './ProtectedRoutes';
// import { getUserInfo } from './components/GetUserInfo';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="/:page" element={<NavBar />} />
        </Routes >
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/Home" element={<HomePage />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/LogIn" element={<LogIn />} />

          <Route element={<BasicRoutes />}>
            <Route exact path="/Profile" element={<Profile />} />
            <Route exact path="/editProfile" element={<EditProfile />} />
            <Route exact path="/Courses" element={<Courses />} />
            <Route exact path="/Course/:courseId" element={<Course/>} />
            {/* <Route exact path="/SearchCourse" element={<SearchCourse />} /> */}
            <Route exact path="/Calendar" element={<Calendar1 />} />
            <Route exact path="/Roadmap" element={<Roadmap />} />
          </Route>

          <Route element={<AdminRoutes />}>
              <Route exact path="/Add_Course" element={<AddCourse />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;