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

function App() {

  return (
    <>

      <Router>
        <Switch>
          <Route exact path={["/", "/:page"]}><NavBar /></Route>
        </Switch >
        <Switch>
          <Route exact path={["/", "/Home"]}><HomePage /></Route>
          {/* <Route exact path="/HomePageAfterLogIn"><HomePageAfterLogIn /></Route> */}
          <Route exact path="/LogIn"><LogIn /></Route>
          <Route exact path="/Signup"><Signup /></Route>
          <Route exact path="/RecordList"><RecordList /></Route>
          <Route exact path="/CoursesParser"><CoursesParser /></Route>
          <Route exact path="/Profile"><Profile /></Route>
          <Route exact path="/Calendar"><Calendar1 /></Route>
          <Route exact path="/SearchCourse"><SearchCourse /></Route>
          <Route exact path="/Courses"><Courses /></Route>

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