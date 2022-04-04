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
      "firstname" : firstname,
      "lastname" : lastname,
      "email" : email,
      "password" : pass,
    };
    console.log(user);
    //sending to server
      const req = await axios.post('/user/signup', user)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
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
                    <label for="fname">First name</label>
                    <input type="text" onChange={handleFirstName} name="firstname" className="firstname" placeholder="firstname..." /> <br/>
                    <label for="lname">Last name</label>
                    <input type="text" onChange={handleLastName} name="lastname" className="lastname" placeholder="lastname..." /> <br/>
                    <label for="email">Email</label>
                    <input type="text" onChange={handleEmail} name="email" className="email" placeholder="email..." /> <br/>
                    <label for="pword">Password<span/><a href="#forgotpw">Forgot Password?</a></label>
                    <input type="password" onChange={handlePass}  name="password" className="password" id="password" placeholder="password..." /> <br/>
                    {/* <button><Link to="/HomePageAfterLogIn">Create an account</Link></button> */}
                    <button onClick={signup} type="button" className="signupbutton"> Submit </button>
                </form>
            </div>
        </div>
      </div>
    
  );
}

export default Signup;
