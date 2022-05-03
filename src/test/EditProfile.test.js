import axios from '../axios';
import React from 'react';
const User = require("../../backend/model/User");
import EditProfile from '../pages/editProfile';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime/runtime';

configure({ adapter: new Adapter() });

jest.mock('../axios');

describe("editProfile component's EditProfile function", () => {

    //given

    //used for function call check
    const user = {
        "firstname": "",
        "lastname": "",
        "email": "",
        "password": "",
    };

    //A limited implementation of the EditProfile component
    const wrapper = shallow(<EditProfile />);

    //Tracks what the console recieves.  Used to ensure certain messages are returned to console on success and failure.
    const consoleSpy = jest.spyOn(console, 'log');

    describe("When API call is successful", () => {
        it("Should log a response object with message on console.", async () => {

            //given

            //mock for post call.  returns a resolved (valid response), which is when a user is correctly signed up.  Message string is to simulate the response object, which contains the same message.
            axios.post.mockResolvedValueOnce('Updated!');

            //when

            //call signup function inside Signup component
            await wrapper.instance().EditProfile();


            //then

            //generic test for post function call
            expect(axios.post).toHaveBeenCalledWith("/user/EditProfile", user)

            //substitue for response object on success
            expect(consoleSpy).toHaveBeenCalledWith('Updated!');

        })

    })
    describe("When API call fails", () => {
        it("Should kick error to console", async () => {

            //given

            //can be anything.  just simulates an error.
            const message = 'Network Error Mock';

            //mock for the post call.  returns a rejection, like when the server encounters an error such as not enough characters in password, username, etc.
            axios.post.mockRejectedValueOnce(message);

            //when

            //call signup function inside Signup component
            await wrapper.instance().EditProfile();

            //then

            //generic test for post function call
            expect(axios.post).toHaveBeenCalledWith("/user/EditProfile", user);

            //check for the error message
            expect(consoleSpy).toHaveBeenCalledWith(message);
        })
    })
});
