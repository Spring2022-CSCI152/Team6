import axios from './axios'
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

const useUser=() =>{
    
    const [user, setUser] = useState({});
    var uInfo

    //loads user info on mount
    useEffect(() => {
        getUserInfo();
    }, []);
    console.log("inside USEUSER!")
    //gets user information from backend
    const getUserInfo = async () => {

        //request user information from server
        const user = await axios.get("/profile")

            .then((res) => {

                //set user state
                uInfo = res.data.user
            
            }).catch((error) => {
                console.log(error);
            })
        
    }
    
    console.log("user")

    return uInfo
}

export default useUser