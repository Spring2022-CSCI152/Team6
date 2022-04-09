import axios from '../axios'
import { useState, useEffect } from 'react';
import '../CSS/profile.css'


//ensures requests to backend include the json web token
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

    //state and state change function for user object
    const [user, setUser] = useState({});

    //loads user info on mount
    useEffect(() => {
        getUserInfo();
    }, []);

    //gets user information from backend
    const getUserInfo = async () => {

        //request user information from server
        const user = await axios.get("/profile")

            .then((res) => {

                //set user state
                setUser(res.data.user);

            }).catch((error) => {
                console.log(error);
            })
    }


    return (<>
        <div className='profile'>
            <h1>Profile Page</h1>

            {/* Example of how to use user object */}
            <ul>
                <li>First Name: {user.firstname}</li>
                <li>Last Name: {user.lastname}</li>
                <li>Email: {user.email}</li>
            </ul>

        </div>
    </>
    )
}

export default Profile

/*
To access user attributes, append its name to "user.", and put inside curly brackets.
Example: {user.firstname}
All user attributes can be found on the mongodb cluster under the "users" collection.  Any not found can be added, too.
*/