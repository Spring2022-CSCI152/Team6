import axios from '../axios'
import { useState, useEffect } from 'react';
import '../CSS/Reminder.css'


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



const Reminder = () => {

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


    return (
        <div class="collection">
             <section class="firstsection">
             <div class="box-main">
             <div class="firstHalf">
             <h1 class="text-big" id="web"> <u class = "underline">Reminders</u></h1>
                <section class="task-list">
                  <div id="tasks">
              <div class = "Reminder:"> Registration Week </div>
              <div class = "date"> Start Date: 04/26/2022 End Date: 04/28/2022 </div>
              <div class = "description"> Description: Registration for classes in Fall 20222 Begins </div>
            </div>
          </section> 
        </div>
      </div>
    </section>
  </div>
    )

      
}

export default Reminder;


