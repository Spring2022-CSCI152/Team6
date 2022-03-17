import './LogIn.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';



function LogIn() {
  return (
      <div className="App">
        <Header />
        <div className='LogIn-Box-wrapper'>
            <div className='LogIn-Box'>
                <p id="title">Log In</p>
                <form>
                    <label for="fname">Email</label>
                    <input type="text" /> <br/>
                    <label for="lname">Password<span/><a href="#forgotpw">Forgot Password?</a></label>
                    <input type="text" /> <br/>
                    <button><Link to="/HomePageAfterLogIn">Log In</Link></button>
                    <button><Link to="/Signup">Create an account</Link></button>
                </form>
            </div>
        </div>
      </div>
    
  );
}

export default LogIn;


/* 
import React, { Component } from "react";
import '../App.css';
export default class Login extends Component {
    render() {
        return (
            <form>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}
*/