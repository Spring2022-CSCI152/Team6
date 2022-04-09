import spinner from '../assets/spinner.svg';
import logo from '../assets/roadmap.jpg';
import '../CSS/App.css';
import React, { useEffect } from 'react';


function HomePage() {


  //logged out view
  let loggedOutTags = []
  loggedOutTags.push(<img src={spinner} width="15%" className="spinner" alt="logo" key={0} />)
  loggedOutTags.push(<img src={logo} height="auto" key={1}/>)
  loggedOutTags.push(<p key={2}>Set your education path ...</p>)

  //current view state
  const [logStatusView, setLogStatusView] = React.useState(localStorage.getItem('token') ? "" : loggedOutTags)


  return (
    <div className="App">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quintessential&display=swap');
      </style>

      <header className="App-header">
        <h1>Welcome to Roadmap</h1>

        {logStatusView}

      </header>
    </div>

  );
}

export default HomePage;
