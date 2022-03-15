import axios from '../axios';
const User = require("../../backend/model/User");

//sign up test
test("Sign Up", () => {

    // const {
    //     firstname,
    //     lastname,
    //     email,
    //     password
    // } = {"firstName":"TestFirst", "TestLast" };

    const user = {
        "firstname": "TestFirst",
        "lastname": "TestLast",
        "email": "Test@Test.Test",
        "password": "Test",
    };
    // expect.assertions(1);
    try {
        expect(axios.post('/user/signup', user));
    } catch (error) {

    }

    let email = user.firstname;
    let user1 = expect(User.findOne({
        email
    })).resolves;
    if (!user1) throw new Error('no user found');

})