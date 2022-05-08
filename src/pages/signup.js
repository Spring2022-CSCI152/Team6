import '../CSS/LogIn.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';
import React from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';



export class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      pass: "",
      account: [],
      passStyle: {color: "black"},
    };
  }

  handleEmail = (event) => {
    this.setState({ email: event.target.value })
    // setEmail(event.target.value)
  }

  handlePass = (e) => {
    this.setState({ pass: e.target.value })
    // setPass(e.target.value)
  }

  handleFirstName = (e) => {
    this.setState({ firstname: e.target.value })
    // setFirstName(e.target.value)
  }

  handleLastName = (e) => {
    this.setState({ lastname: e.target.value })
    // setLastName(e.target.value)
  }

  signup = async () => {
    const user = {
      "firstname": this.state.firstname,
      "lastname": this.state.lastname,
      "email": this.state.email,
      "password": this.state.pass,
    };

    //debug: verify user attributes
    console.log(user);

    //sending to server
    const req = await axios.post('/user/signup', user)

      //success case
      .then((res) => {
        console.log(res);

        alert(res.data.message);

        //store json web token in local storage.
        localStorage.setItem('token', res.data.token);

        //store user role locally
        localStorage.setItem('role', res.data.role);

        //navigate to home page
        window.location.href = "/";

        //fail case
      }).catch((error) => {

        console.log(error)

      });
  }


  render() {


    return (
      <div className="Signup"><div className="bg-image"></div>
        <div className='Signup-Box-wrapper'>
          <div className='Signup-Box'>
            <p id="title">Create a new account</p>
            <form>
              <label htmlFor="fname">First name</label>
              <input type="text" onChange={this.handleFirstName} name="firstname" className="input" placeholder="firstname..." id="fname" /> <br />
              <label htmlFor="lname">Last name</label>
              <input type="text" onChange={this.handleLastName} name="lastname" className="input" placeholder="lastname..." id="lname" /> <br />
              <label htmlFor="email">Email</label>
              <input type="text" onChange={this.handleEmail} name="email" className="email" placeholder="email..." id="email" /> <br />
              <label htmlFor="pword">Password<span /></label>
              <input type="password" onChange={this.handlePass} name="password" className="password" id="pword" placeholder="password..." /> <br />
              <PasswordStrengthBar scoreWordClassName="scoreWord" scoreWordStyle={this.state.passStyle} password={this.state.pass} />


              <button onClick={this.signup} type="button" className="signupbutton"> Create </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;
