import '../CSS/LogIn.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from '../axios';


export class login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      account: [],
    };
  }

  handleEmail = (event) => {
    this.setState({ email: event.target.value })
  }

  handlePass = (e) => {
    this.setState({ pass: e.target.value })
  }


  login = async () => {
    const user = {
      "email": this.state.email,
      "password": this.state.pass,
    };

    //sending to server

    //debug:
    // console.log(user);

    const req = await axios.post('/user/login', user)

      .then((res) => {

        //gives "Logged in!" message
        console.log(res);

        alert(res.data.message);

        //store json web token in local storage.
        localStorage.setItem('token', res.data.token);

        //store user role locally
        localStorage.setItem('role', res.data.role);

        //navigate to home page
        window.location.href = "/";
      }).catch((error) => {
        console.log(error)
        global.alert("Error");
      
       
      });
  }




  /*function LogIn(setToken) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [account, setAccount] = useState([]);
  
  
    const handleEmail = (event) => {
      setEmail(event.target.value)
    }
  
    const handlePass = (e) => {
      setPass(e.target.value)
  
    }
  
    const login = async () => {
      const user = {
        "email": email,
        "password": pass
      };
      //sending to server
      const req = await axios.post('/user/login', user)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
  
          //store json web token in local storage.
          localStorage.setItem('token', res.data.token);
  
          //navigate to home page
          window.location.href = "/";
        }).catch((error) => {
          console.log(error.response.data.message)
          alert(error.response.data.message);
        });
    }
    */

  render() {

    return (
      <div className="Login"><div className="bg-image"></div>
        <div className='LogIn-Box-wrapper'>
          <div className='LogIn-Box'>
            <p id="title">Log In</p>
            <form>
              <label htmlFor='email'>Email</label>
              <input type="text" onChange={this.handleEmail} name="email" className="email" placeholder="email..." id="email" /> <br />
              <label htmlFor="password">Password<a href="#forgotpw">Forgot Password?</a></label>
              <input type="password" onChange={this.handlePass} name="password" className="password" id="password" placeholder="password..." /> <br />
              <button onClick={this.login} type="button" className="loginbutton"> Log In </button>
              <button type="button"><Link to="/Signup">Create an account</Link></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default login;
