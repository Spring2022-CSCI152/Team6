import './LogIn.css';
import axios from '../axios'
import { Link } from 'react-router-dom';


axios.interceptors.request.use(
    config => {
        // const { origin } = new URL(config.url);
        // const allowedOrigins = [apiUrl];
        const token = localStorage.getItem('token');
        // if (allowedOrigins.includes(origin)) {
        config.headers.authorization = `Bearer ${token}`;
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//test
const getUserInfo = async () => {

    //request user information from server
    const user = await axios.get("/profile/test")
        .then((res) => {
            // console.log(res.data);
            return res.data;
        }).catch((error) => {
            console.log(error);
        })
}

const Profile = () => {


    // const firstName = user.firstname;

    const user = getUserInfo();
    console.log("user", user);
    let firstName = user.firstname;
    console.log(firstName);


    return (<>
        <h1>Profile Page</h1>
        <Link to="/Login">Login</Link><button>Test</button>
        <p>First Name: {firstName}</p>
    </>

    )
}

export default Profile