import React from 'react';
import './CSS/App.css'
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageAfterLogIn from './pages/HomePageAfterLogIn';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import LogIn from './pages/login';
import Signup from './pages/signup';
import RecordList from './components/RecordList';
import CoursesParser from './pages/Admin/CoursesParser';
import Calendar1 from './pages/calendar';
import { useState } from 'react';
import axios from 'axios';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/"><HomePage /></Route>
        <Route exact path="/HomePageAfterLogIn"><HomePageAfterLogIn /></Route>
        <Route exact path="/LogIn"><LogIn /></Route>
        <Route exact path="/Signup"><Signup /></Route>
        <Route exact path="/RecordList"><RecordList /></Route>
        <Route exact path="/CoursesParser"><CoursesParser /></Route>
        <Route exact path="/Profile"><Profile /></Route>
        <Route exact path="/Calendar"><Calendar1 /></Route>

      </Switch>
    </Router>
  );
}

export default App;

{/*
AuthContext is an authorization method?  Saved old code here for future reference.  Will delete once authorization problem is solved/approved.
import {useState} from 'react';
//  export const AuthContext = React.createContext()
  // const [authState, setAuthState] = useState(localStorage.getItem("user") ? true : false)
        function App(){
        return(
          { <AuthContext.Provider value={[authState, setAuthState]}> }
          /*{Routes Here}
           { </AuthContext.Provider>}
);
}

*/}