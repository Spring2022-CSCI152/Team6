import spinner from '/Users/gurleenkaur/Desktop/Team6/src/assets/spinner.svg';
import logo from '/Users/gurleenkaur/Desktop/Team6/src/assets/roadmap.jpg';
import '/Users/gurleenkaur/Desktop/Team6/src/App.css';
import Header from '/Users/gurleenkaur/Desktop/Team6/src/components/Header.js';
import '/Users/gurleenkaur/Desktop/Team6/src/App.css';

function home() {
  window.onload = function(){
    setInterval(function(){
        // alert("Hello");
    }, 5000);
 };
  return (
    <div className="App">
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Quintessential&display=swap');
      </style>
      <Header/>
      <header className="App-header">
        <p>Welcome to Roadmap</p>
        <img src={spinner} width="15%" className="spinner" alt="logo" />
        <img src={logo} height="auto"/>
        <p1>Set your education path ...</p1>ß
      </header>
    </div>
  );
}

export default home;
