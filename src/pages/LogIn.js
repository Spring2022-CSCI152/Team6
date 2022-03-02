import './LogIn.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';




function LogIn() {
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

  const login = async () => {
    console.log("email "+ email + " pass "+ pass);
    const user = {
      "email" : email,
      "password" : pass
    };
    console.log(user);
    //sending to server
      const req = await axios.get('/accounts/email', {body: {"email" : "vi"}})
      .then((res) => {
          alert("go through "+res.data)
          alert(res.data)
      }).catch((error) => {
          console.log(error)
          alert(error)
      });

      // setAccount(req.data);
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
                    <input type="text" onChange={handlePass} name="password" className="password" id="password" placeholder="password..." /> <br/>
                    <button onClick={login}>Log In</button>
                    <button><Link to="/Signup">Create an account</Link></button>
                </form>
            </div>
        </div>
      </div>
    
  );
}

export default LogIn;
