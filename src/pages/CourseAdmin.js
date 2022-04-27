import axios from '../axios'
import { useState, useEffect } from 'react';
import '../CSS/CourseAdmin.css'


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

function addClasses(){
    var text = document.getElementById("popup");
    text.classList.toggle("show");
}

function enterClass(){

}

const CourseAdmin = () => {

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
    //console.log(user)

    return (<>
        <div className='CourseAdmin'>
            <h1>Your Classes</h1>
            <button>edit class</button>
            <button onClick={addClasses}>add class</button>
            <div name="popup" id="popup" class="hide">
            Course Abbreviation
            <div>
                <input type="text" ></input>
            </div>
            Course Name
            <div>        
                <input type="text"></input>
            </div>
            Course Description
            <div>        
                <input type="text"></input>
            </div>
            Time
            <div>        
                <input type="text"></input>
            </div>
                Capacity<div>
                    
                    <input type="text"></input>
                </div>
                
                <button onClick={enterClass}>Enter</button>
            </div>

           

        </div>
    </>
    )
}

export default CourseAdmin

/*
To access user attributes, append its name to "user.", and put inside curly brackets.
Example: {user.firstname}
All user attributes can be found on the mongodb cluster under the "users" collection.  Any not found can be added, too.
*/