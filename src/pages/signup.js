import './LogIn.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';



function Signup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail]= useState("");
  const [pass, setPass] = useState("");
  const [account, setAccount] = useState([]);


  const handleEmail = (event) => {
    console.log("email", event.target.value)
    setEmail(event.target.value)
  }

  const handlePass = (e) => {
      console.log("pass", e.target.value)
      setPass(e.target.value)
  }

  const handleFirstName = (e) => {
      console.log("fname", e.target.value)
      setFirstName(e.target.value)
  }

  const handleLastName = (e) => {
      console.log("lname", e.target.value)
      setLastName(e.target.value)
  }

  const signup = async () => {
    console.log(email, pass)
    const user = {
      "email" : email,
      "password" : pass,
      "firstname" : firstname,
      "lastname" : lastname
    };
    console.log(user);
    //sending to server
      const req = await axios.post('/accounts', user)
      .then((res) => {
          console.log(res.data)
      }).catch((error) => {
          console.log(error)
      });

      // setAccount(req.data);
  }
  

  return (
      <div className="App">
        <Header />
        <div className='LogIn-Box-wrapper'>
            <div className='LogIn-Box'>
                <p id="title">Create a new account</p>
                <form>
                    <label for="fname">First name</label>
                    <input type="text" onChange={handleFirstName} name="firstname" className="firstname" placeholder="firstname..." /> <br/>
                    <label for="lname">Last name</label>
                    <input type="text" onChange={handleLastName} name="lastname" className="lastname" placeholder="lastname..." /> <br/>
                    <label for="email">Email</label>
                    <input type="text" onChange={handleEmail} name="email" className="email" placeholder="email..." /> <br/>
                    <label for="pword">Password<span/><a href="#forgotpw">Forgot Password?</a></label>
                    <input type="text" onChange={handlePass} name="password" className="password" id="password" placeholder="password..." /> <br/>
                    {/* <button><Link to="/HomePageAfterLogIn">Create an account</Link></button> */}
                    <button onClick={signup} type="button" className="signupbutton"> Submit </button>
                </form>
            </div>
        </div>
      </div>
    
  );
}

export default Signup;

/*



import React, { Component } from "react";
import '../App.css';

export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Create a New Account</h3>

                <div className="form-group">
                    <label>Full name</label>
                    <input type="text" className="form-control" placeholder="Full name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Create Account</button>
                {/* <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p> (comment here)}
            </form>
        );
    }
}*/