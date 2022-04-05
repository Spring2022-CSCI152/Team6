// import '../CSS/profile.css';
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
            console.log("data",res.data);

            let user = res.data.user;
            console.log(user);
            console.log("firstname",user.firstname);
            return res.data.user;
        }).catch((error) => {
            console.log(error);
        })
}

const Profile = () => {

    const user = getUserInfo();
    console.log("user", user);
    let firstName = user.firstname;
    console.log("firstName",firstName);


    return (<div className='App'>
        <h1>Profile Page</h1>
        <Link to="/Login">Login</Link><button>Test</button>
        <p>First {firstName} Name: {firstName}</p> {firstName}
    </div>

    )
}

export default Profile