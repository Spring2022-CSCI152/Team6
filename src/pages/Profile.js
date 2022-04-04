import axios from '../axios'
import React from 'react'
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
const profileBackendTest = async () => {

    let firstname = await axios.get("/profile/test")
        .then((res) => {
            alert("It worked!");
            console.log(res.data.test);
            console.log(res.data.token);
        }).catch((error) => {
            console.log(error);
        })
}

const Profile = () => {



    const a = profileBackendTest();

    return (<>
        <h1>Profile Page</h1>
        <Link to="/Login">Login</Link><button>Test</button>
    </>

    )
}

export default Profile