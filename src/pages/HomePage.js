
import roadmap from '../assets/line-art-map_2.gif';
import '../CSS/Home.css';
import React, { useEffect } from 'react';

function getStart(){
  window.location.href="./LogIn";
}

function HomePage() {
  //logged out view
  let loggedOutTags = []
  loggedOutTags.push(<img src={roadmap} height="auto" key={1}/>)
  loggedOutTags.push(<p key={2}>Set your educational path</p>)
  loggedOutTags.push(
  <button id='GetStart-Btn' onClick={getStart} key={3}>Get Started</button>
  )

  //current view state
  const [logStatusView, setLogStatusView] = React.useState(localStorage.getItem('token') ? "" : loggedOutTags)


  return (
    <div className="home">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quintessential&display=swap');
      </style>

      <div className="App-header">
        <h1 id="h1">Bulldog Roadmap</h1>

        {logStatusView}

      </div>
    </div>

  );
}

export default HomePage;
