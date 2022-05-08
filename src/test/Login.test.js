import axios from '../axios';
import React from 'react';
import '../CSS/LogIn.css';
const User = require("../../backend/model/User");
import Login, { login } from '../pages/login';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime/runtime';

configure({ adapter: new Adapter() });

jest.mock('../axios');
jest.mock('../CSS/LogIn.css');


global.alert = jest.fn();

describe("Login component's login function", () => {

    //given

    //used for function call check
    const user = {
        "email": "",
        "password": "",
    };

    //A limited implementation of the Login component
    const wrapper = shallow(<Login />);

    //Tracks what the console recieves.  Used to ensure certain messages are returned to console on success and failure.
    const consoleSpy = jest.spyOn(console, 'log');


    describe("When API call is successful", () => {
        it("Should log a response object with message on console.", async () => {

            //given

            //mock for post call.  returns a resolved (valid response), which is when a user is correctly logged in.  Message string is to simulate the response object, which contains the same message.
            axios.post.mockResolvedValueOnce('Logged in!');

            //when

            //call login function inside Login component
           await wrapper.instance().login();


            //then

            //generic test for post function call
            expect(axios.post).toHaveBeenCalledWith("/user/login", user)

            //substitue for response object on success
            expect(consoleSpy).toHaveBeenCalledWith('Logged in!');

        })

    })
    describe("When API call fails", () => {
        it("Should kick error to console", async () => {

            global.alert.mockClear();

            axios.post.mockResolvedValueOnce('Error');

            await wrapper.instance().login();

            expect(axios.post).toHaveBeenCalledWith("/user/login", user);
            
            expect(consoleSpy).toHaveBeenCalledWith("Error");

            expect(global.alert).toBeCalledWith("Error");
    

/*
            //given

            //can be anything.  just simulates an error.
            const message = 'Network Error Mock';

            //mock for the post call.  returns a rejection, like when the server encounters an error such as not enough characters in password, username, etc.
            axios.post.mockRejectedValueOnce(message);

            //when

            //call login function inside Login component
           await wrapper.instance().login();

            //then

            //generic test for post function call
            expect(axios.post).toHaveBeenCalledWith("/user/login", user);

            //check for the error message
           expect(consoleSpy).toHaveBeenCalledWith(message);*/
        })
    })
});
