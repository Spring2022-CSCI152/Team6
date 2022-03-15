import e from 'express';
import axios from '../axios';
const User = require("../../backend/model/User");

const user = {
    "firstname": "TestFirst",
    "lastname": "TestLast",
    "email": "Test@Test.Test",
    "password": "Test",
};

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
test("Sign Up: Check for email uniqueness within db.", async () => {

    //ensure the test user is in the roadmap mongodb collection "users" through an attempt to add him
    //could move to beforeAll function
    await axios.post('/user/signup', user)
        .then((res) => {
            // console.log(res.data)
        }).catch((error) => {
            // console.log(error)
        });

    //create a different user but has the same email address as first
    const user2 = {
        "firstname": "TestFirst2",
        "lastname": "TestLast2",
        "email": "Test@Test.Test",
        "password": "Test2",
    }

    //try to sign up user2 up with duplicate email
    return expect(axios.post('/user/signup', user2)).rejects.toThrowError("Request failed with status code 400")


});