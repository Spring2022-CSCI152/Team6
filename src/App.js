import spinner from './assets/spinner.svg';
import logo from './assets/roadmap.jpg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageAfterLogIn from './pages/HomePageAfterLogIn';
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';
import CreateAccountPage from './pages/CreateAccountPage'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><HomePage /></Route>
        <Route exact path="/HomePageAfterLogIn"><HomePageAfterLogIn /></Route>      
        <Route exact path="/LogIn"><LogIn /></Route>
        <Route exact path="/CreateAccountPage"><CreateAccountPage /></Route>
      </Switch>
    </Router>
    
  );
}

export default App;
