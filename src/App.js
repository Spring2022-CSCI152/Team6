import React from 'react';
import './CSS/App.css'
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import CourseAdmin from './pages/CourseAdmin';
import CatalogAdmin from './pages/CatalogAdmin';
import { Redirect} from 'react-router-dom';
import useUser from './useAuth';
import useConfig from './useConfig';

const role=""

function basicRole(){
  if (role == "admin" || role == "basic") return true;
  return false;
}

function adminRole(){
  if (role == "admin") return true;
  return false;
}

function BasicRoute ({children, ...rest}) {

  //console.log(user)
  return(
    <Route {...rest} render={() => {
      console.log(useUser)
      return useUser
        ? children
        : <Redirect to='/home' />
    }}/>
  )
}

function AdminRoute ({children, ...rest}) {
  //console.log(user)
  return(
    <Route {...rest} render={() => {
      return adminRole()
        ? children
        : <Redirect to='/home' />
    }}/>
  )
}

function InvalidRoute(){
  return console.error("invalid page");
}

function App() {
  return (
    <>
      <Router forceRefresh={false}>
        <Switch>
          <Route exact path={["/", "/:page"]}><NavBar /></Route>

        </Switch >
        <Switch>
          <Route exact path={["/", "/Home"]}><HomePage /></Route>
          {/* <Route exact path="/HomePageAfterLogIn"><HomePageAfterLogIn /></Route> */}
          <Route exact path="/LogIn"><LogIn /></Route>
          <Route exact path="/Signup"><Signup /></Route>

          <BasicRoute exact path="/RecordList"><RecordList /></BasicRoute>
          <BasicRoute exact path="/CoursesParser"><CoursesParser /></BasicRoute>
          <BasicRoute exact path="/Profile"><Profile /></BasicRoute>
          <BasicRoute exact path="/Calendar"><Calendar1 /></BasicRoute>
          <BasicRoute exact path="/SearchCourse"><SearchCourse /></BasicRoute>
          <BasicRoute exact path="/Courses"><Courses /></BasicRoute>
          <BasicRoute exact path="/CoursesForAdmin"><CoursesForAdmin /></BasicRoute>
          <AdminRoute exact path="/CourseAdmin"><CourseAdmin /></AdminRoute>
          <AdminRoute exact path="/CatalogAdmin"><CatalogAdmin /></AdminRoute>

          <Route path="*"><HomePage /></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

// {/*
// AuthContext is an authorization method?  Saved old code here for future reference.  Will delete once authorization problem is solved/approved.
// import {useState} from 'react';
// //  export const AuthContext = React.createContext()
//   // const [authState, setAuthState] = useState(localStorage.getItem("user") ? true : false)
//         function App(){
//         return(
//           { <AuthContext.Provider value={[authState, setAuthState]}> }
//           /*{Routes Here}
//            { </AuthContext.Provider>}
// );
// }

// */}