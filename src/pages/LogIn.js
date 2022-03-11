import './LogIn.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';




function LogIn() {
  const [email, setEmail]= useState("");
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
      "email" : email,
      "password" : pass
    };
    //sending to server
      const req = await axios.post('/user/login', user)
      .then((res) => {
          console.log(res);
          alert(res.data.message);
          window.location.href="/HomePageAfterLogIn";
      }).catch((error) => {
          console.log(error.response.data.message)
          alert(error.response.data.message);
      });
  }
  
  return (
      <div className="App">
        <Header />
        <div className='LogIn-Box-wrapper'>
            <div className='LogIn-Box'>
                <p id="title">Log In</p>
                <form>
                    <label for="fname">Email</label>
                    <input type="text" onChange={handleEmail} name="email" className="email" placeholder="email..." /> <br/>
                    <label for="lname">Password<span/><a href="#forgotpw">Forgot Password?</a></label>
                    <input type="password" onChange={handlePass} name="password" className="password" id="password" placeholder="password..." /> <br/>
                    <button type="button" onClick={login}>Log In</button>
                    <button type="button"><Link to="/Signup">Create an account</Link></button>
                </form>
            </div>
        </div>
      </div>
    
  );
}

export default LogIn;
