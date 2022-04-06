import spinner from '../assets/spinner.svg';
import logo from '../assets/roadmap.jpg';
import '../CSS/App.css';
import Header from '../components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageAfterLogIn from './HomePageAfterLogIn';


function HomePage() {
  return (
      <div className="App">
        <Header />
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Quintessential&display=swap');
        </style>
        
        <header className="App-header">
          <p>Welcome to Roadmap</p>
          <img src={spinner} width="15%" className="spinner" alt="logo" />
          <img src={logo} height="auto"/>
          <p>Set your education path ...</p>
        </header>
      </div>
    
  );
}

export default HomePage;
