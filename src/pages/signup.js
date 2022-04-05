import '../CSS/LogIn.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';



function Signup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [account, setAccount] = useState([]);


  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePass = (e) => {
    setPass(e.target.value)
  }

  const handleFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastName = (e) => {
    setLastName(e.target.value)
  }

  const signup = async () => {
    const user = {
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "password": pass,
    };
    console.log(user);
    //sending to server
    const req = await axios.post('/user/signup', user)
      .then((res) => {
        console.log(res);
        alert(res.data.message);

        //store json web token in local storage.
        localStorage.setItem('token', res.data.token);

      }).catch((error) => {
        console.log(error)
      });
  }


  return (
    <div className="App">
      <Header />
      <div className='LogIn-Box-wrapper'>
        <div className='LogIn-Box'>
          <p id="title">Create a new account</p>
          <form>
            <label htmlFor="fname">First name</label>
            <input type="text" onChange={handleFirstName} name="firstname" className="firstname" placeholder="firstname..." id="fname" /> <br />
            <label htmlFor="lname">Last name</label>
            <input type="text" onChange={handleLastName} name="lastname" className="lastname" placeholder="lastname..." id="lname" /> <br />
            <label htmlFor="email">Email</label>
            <input type="text" onChange={handleEmail} name="email" className="email" placeholder="email..." id="email" /> <br />
            <label htmlFor="pword">Password<span /><a href="#forgotpw">Forgot Password?</a></label>
            <input type="password" onChange={handlePass} name="password" className="password" id="pword" placeholder="password..." /> <br />
            {/* <button><Link to="/HomePageAfterLogIn">Create an account</Link></button> */}
            <button onClick={signup} type="button" className="signupbutton"> Submit </button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Signup;
