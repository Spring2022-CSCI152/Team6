import axios from '../axios';
import React from 'react';
const User = require("../../backend/model/User");
import Signup from '../pages/signup';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime/runtime';

configure({ adapter: new Adapter() });

jest.mock('../axios');
global.alert = jest.fn();

describe("SignUp component's signup function", () => {

    //given

    //used for function call check
    const user = {
        "firstname": "",
        "lastname": "",
        "email": "",
        "password": "",
    };

    //A limited implementation of the Signup component
    const wrapper = shallow(<Signup />);

    //Tracks what the console recieves.  Used to ensure certain messages are returned to console on success and failure.
    const consoleSpy = jest.spyOn(console, 'log');


    describe("When API call is successful", () => {
        it("Should log a response object with message on console.", async () => {

            //given

            //mock for post call.  returns a resolved (valid response), which is when a user is correctly signed up.  Message string is to simulate the response object, which contains the same message.
            axios.post.mockResolvedValueOnce('Signed Up!');

            //when

            //call signup function inside Signup component
            await wrapper.instance().signup();


            //then

            //generic test for post function call
            expect(axios.post).toHaveBeenCalledWith("/user/signup", user)

            //substitue for response object on success
            expect(consoleSpy).toHaveBeenCalledWith('Signed Up!');

        })

    })
    describe("When API call fails", () => {
        it("Should kick error to console", async () => {

            global.alert.mockClear();

            //given

            //can be anything.  just simulates an error.

            //mock for the post call.  returns a rejection, like when the server encounters an error such as not enough characters in password, username, etc.
            axios.post.mockResolvedValueOnce('Error');

            //when

            //call signup function inside Signup component
            await wrapper.instance().signup();

            //then

            //generic test for post function call
            expect(axios.post).toHaveBeenCalledWith("/user/signup", user);

            //check for the error message
            expect(consoleSpy).toHaveBeenCalledWith("Error");

            expect(global.alert).toBeCalledWith("Error");
        })
    })
});




//Below is was a test that did both front end, backend, and database.  Did not use a mock.  Was probably not as safe to use, which is why above was implemented.

// const user = {
//     "firstname": "TestFirst",
//     "lastname": "TestLast",
//     "email": "Test@Test.Test",
//     "password": "Test",
// };

//ensure the test user is in the roadmap mongodb collection "users" through an attempt to add him
// beforeAll(async () => {
//     return axios.post('/user/signup', user)
//         .then((res) => {
//             // console.log(res.data)
//         }).catch((error) => {
//             // console.log(error)
//         });
// });

//sign up tests
//check if email already registered to another user.
// needs the backend to be on/started
// test("Sign Up: Check for email uniqueness within db.", async () => {

//     //ensure the test user is in the roadmap mongodb collection "users" through an attempt to add him
//     //could move to beforeAll function
//     await axios.post('/user/signup', user)
//         .then((res) => {
//             // console.log(res.data)
//         }).catch((error) => {
//             // console.log(error)
//         });

//     //create a different user but has the same email address as first
//     const user2 = {
//         "firstname": "TestFirst2",
//         "lastname": "TestLast2",
//         "email": "Test@Test.Test",
//         "password": "Test2",
//     }

//     //try to sign up user2 up with duplicate email
//     return expect(axios.post('/user/signup', user2)).rejects.toThrowError("Request failed with status code 400")
// });