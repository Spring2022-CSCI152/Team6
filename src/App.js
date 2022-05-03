import React from 'react';
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

let userAuthen = "userAuth";

function BasicRoute ({children, ...rest}) {
  //console.log(user)
  return(
    <Route {...rest} render={() => {
      return userAuthen == "basic"
        ? children
        : <Redirect to='/home' />
    }}/>
  )
}

function AdminRoute ({children, ...rest}) {
  //console.log(user)
  return(
    <Route {...rest} render={() => {
      return userAuthen == "admin"
        ? children
        : <Redirect to='/home' />
    }}/>
  )
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
          
          <Route exact path="/LogIn"><LogIn /></Route>
          <Route exact path="/Signup"><Signup /></Route>

          <Route exact path="/RecordList"><RecordList /></Route>
          <Route exact path="/CoursesParser"><CoursesParser /></Route>
          <Route exact path="/Profile"><Profile /></Route>
          <Route exact path="/Calendar"><Calendar1 /></Route>
          <Route exact path="/SearchCourse"><SearchCourse /></Route>
          <Route exact path="/Courses"><Courses /></Route>
          <Route exact path="/CoursesForAdmin"><CoursesForAdmin /></Route>
          <Route exact path="/Roadmap"><Roadmap /></Route>
          <Route exact path="/Reminders"><Reminders /></Route>
          <Route exact path="/editProfile"><EditProfile /></Route>
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;