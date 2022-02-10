import React from 'react'; 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Login from './pages/login';



export const AuthContext = React.createContext()

function App() {
  //const [authState, setAuthState] = useState(localStorage.getItem("user") ? true : false)

  return (
    <Router>
          
          {/* <AuthContext.Provider value={[authState, setAuthState]}> */}
          <Routes>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
           </Routes>
           {/* </AuthContext.Provider> */}
    </Router>
  );
}

export default App;