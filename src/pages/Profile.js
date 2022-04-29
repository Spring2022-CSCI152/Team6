import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../components/GetUserInfo';
import '../CSS/profile.css'






const Profile = () => {

    //state and state change function for user object
    const [user, setUser] = useState({});

    //loads user info on mount
    useEffect(async () => {
        
        //calls back-end to get user information
        const userResponse = await getUserInfo();

        //sets user state based on response
        setUser(userResponse);
    }, []);

    //render
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