// import '../CSS/profile.css';
import axios from '../axios'
import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';


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



const Profile = () => {

    const [user, setUser] = useState({});


    //calls user load on mount
    useEffect(() => {
        getUserInfo();
    }, []);

    //gets user information from backend
    const getUserInfo = async () => {
        //request user information from server
        const user = await axios.get("/profile/test")
            .then((res) => {
                let user = res.data.user;
                setUser(user);
            }).catch((error) => {
                console.log(error);
            })
    }


    return (<div className='App'>
        <h1>Profile Page</h1>
        <Link to="/Login">Login</Link><button>Test</button>
        <ul>
            <li>First Name: {user.firstname}</li>
            <li>Last Name: {user.lastname}</li>
            <li>Email: {user.email}</li>
        </ul>

    </div>

    )
}

export default Profile

/*
To access user attributes, append its name to "user.", and put inside curly brackets.
Example: {user.firstname}
All user attributes can be found on the mongodb cluster under the "users" collection.  Any not found can be added, too.
*/