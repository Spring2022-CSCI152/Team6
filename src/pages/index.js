import spinner from '../assets//spinner.svg';
import logo from '../assets/roadmap.jpg';
import Header from '../components/Header.js';
import '../App.css';

function Home() {
  window.onload = function(){
    setInterval(function(){
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

export default Home;




