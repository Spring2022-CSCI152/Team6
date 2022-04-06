import spinner from '../assets/spinner.svg';
import logo from '../assets/roadmap.jpg';
import '../CSS/App.css';
import React from 'react';


function HomePage() {



  let loggedOutTags = []
  loggedOutTags.push(<img src={spinner} width="15%" className="spinner" alt="logo" />)
  loggedOutTags.push(<img src={logo} height="auto" />)
  loggedOutTags.push(<p>Set your education path ...</p>)

  const [logStatusView, setLogStatusView] = React.useState(localStorage.getItem('token') ? "" : loggedOutTags)

  // const logStatusView = ;

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
