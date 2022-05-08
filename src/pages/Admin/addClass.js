import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../components/GetUserInfo';
import { Button, Container, Form, Image, Row, Col } from 'react-bootstrap';
import '../../CSS/CourseAdmin.css'
import EditClass from './editClass';


const Profile = () => {

    //state and state change function for user object
    const [user, setUser] = useState({});

    //loads user info on mount
    useEffect(() => {

        async function getUserInfoWrapper() {

            //updates user state with user object from backend, matched by stored cookie id
            setUser(await getUserInfo());
            //console.log(user);
        }

        getUserInfoWrapper();
        
    }, []);

    function addClasses(){
        var text = document.getElementById("popup");
        text.classList.toggle("show");
    }

    function enterClass(){

    }

    //render
    return (<>
        <div className='CourseAdmin'>
            <h2>Your Classes</h2>
            <Link to="/EditClass"><button>
                    Edit Class
                    </button>
                    </Link>
            <button onClick={addClasses}>add class</button>
            <div name="popup" id="popup" className="hide">
                Course Abbreviation
                <div>
                    <input type="text" ></input>
                </div>
                Course Name
                <div>        
                    <input type="text" ></input>
                </div>
                Course Description
                <div>        
                    <input type="text"></input>
                </div>
                Time
                <div>        
                    <input type="text"></input>
                </div>
                Capacity
                <div>
                    <input type="text"></input>
                </div>
                <button onClick={enterClass}>Enter</button>
            </div>
        </div>
    </>
    )
}

export default Profile;
