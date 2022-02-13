import './LogIn.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';



function LogIn() {
  return (
      <div className="App">
        <Header />
        <div className='LogIn-Box-wrapper'>
            <div className='LogIn-Box'>
                <p id="title">Create a new account</p>
                <form>
                    <label for="fname">First name</label>
                    <input type="text" /> <br/>
                    <label for="fname">Last name</label>
                    <input type="text" /> <br/>
                    <label for="fname">Email</label>
                    <input type="text" /> <br/>
                    <label for="lname">Password<span/><a href="#forgotpw">Forgot Password?</a></label>
                    <input type="text" /> <br/>
                    <button><Link to="/HomePageAfterLogIn">Create an account</Link></button>
                </form>
            </div>
        </div>
      </div>
    
  );
}

export default LogIn;