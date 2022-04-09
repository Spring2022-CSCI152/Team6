import '../CSS/LogIn.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';




function LogIn(setToken) {
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

  return (
    <div className="App">
      <div className='LogIn-Box-wrapper'>
        <div className='LogIn-Box'>
          <h1 id="title">Log In</h1>
          <form>
            <label htmlFor='email'>Email</label>
            <input type="text" onChange={handleEmail} name="email" className="email" placeholder="email..." id="email" /> <br />
            <label htmlFor="password">Password<span /><a href="#forgotpw">Forgot Password?</a></label>
            <input type="password" onChange={handlePass} name="password" className="password" id="password" placeholder="password..." /> <br />
            <button type="button" onClick={login}>Log In</button>
            <button type="button"><Link to="/Signup">Create an account</Link></button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default LogIn;
