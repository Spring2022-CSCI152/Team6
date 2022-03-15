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

//sign up test.  
test("Sign Up: Check if email already registered to another user.", async () => {

    //ensure the test user is in the roadmap mongodb collection "users" through an attempt to add him
    //could move to beforeAll function
    axios.post('/user/signup', user)
        .then((res) => {
            // console.log(res.data)
        }).catch((error) => {
            // console.log(error)
        });

    //store user's email into a variable
    let email = user.firstname;

    //check if user is found by email
    expect(User.findOne({ email })).not.toBe(undefined)

})