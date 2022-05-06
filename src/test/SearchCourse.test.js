import 'jsdom-global/register';  //mount
import axios from '../axios';
import React from 'react';
import FindCourse from '../pages/SearchCourse';
import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime/runtime';
import { render, fireEvent } from '@testing-library/react'


configure({ adapter: new Adapter() });

jest.mock('../axios');
jest.mock('../CSS/course.css');

describe('SearchCourse Functional Component', () => {

    //given

    //component
    const wrapper = mount(<FindCourse />)

    // axios.post.mockResolvedValueOnce("banana");

    const expectedData = {
        data: {
            courses: [
                {
                    "_id": "625351cef0b9aef4327e13c3",
                    "classNameAb": "CSCI 1",
                    "className": "Critical Thinking and Computer Science",
                    "Prerequisites": [
                        "Intermediate algebra"
                    ],
                    "Description": "Overview of the field of computer science with an emphasis on critical thinking skills. Problem-solving strategies, algorithm design, and data abstraction. Introduction to hardware, theoretical limitations of computers, and issues arising from the growing role of computers in society. G.E. Foundation A3.",
                    "Units": 3,
                    "TermTypicallyOffered": [
                        "Fall",
                        "Spring"
                    ]
                }
            ]
        }
    };

    axios.post.mockResolvedValueOnce(expectedData);

    const consoleSpy = jest.spyOn(console, 'log');


    it('should render a text input tag (search box)', () => {

        expect(wrapper.find('input[name="finding"]').exists()).toBe(true);
    });

    it('should render a submit button', () => {
        expect(wrapper.find('button[name="submit"]').exists()).toBe(true);
    })

    it('the default value for text input box should be empty', () => {

        expect(wrapper.find('input[name="finding"]').prop('value')).toBe("");
    });

    it('on change of value in the search box, the state should change, and then update the text box', () => {

        //simulate text box entry of 'CSCI 1'
        wrapper.find('input[name="finding"]').simulate('change', { target: { value: 'CSCI 1' } });

        //verify change to state
        expect(wrapper.find('input[name="finding"]').prop('value')).toBe('CSCI 1');
    })


    it('should call an axios method to query database on form submission', async () => {

        //when
        wrapper.find('form[name="SearchCourseForm"]').simulate('submit');

        //then

        const finding = {"specific": "CSCI 1" };

        expect(axios.post).toHaveBeenCalledWith('/course/search', finding)



    })

    // it('should display the course abbreviation after correct course searched', async () => {

    // expect(consoleSpy).toHaveBeenCalledWith('banana');

    //     const abbr = wrapper.find('p[id="classNameAb"]');

    //     expect(abbr.text()).toEqual('CSCI 1');

    // })

    //testing updated input without using mock
    describe('Input search from user', () => {
        it('updates the change', () => {
          const setcourse = jest.fn((value) => {})
          
          const { queryByPlaceholderText } = render(<FindCourse setCourse={setcourse}/>)
      
          const searchInput = queryByPlaceholderText('finding...')
      
          fireEvent.change(searchInput, { target: { value: 'test' } })
      
          expect(searchInput.value).toBe('test')
        })
      })

    

      });


    /*describe("When API call is successful", () => {
        it("Should log a response object with message on console.", async () => {

            //given

            //mock for post call.  returns a resolved (valid response), which is when a user is correctly logged in.  Message string is to simulate the response object, which contains the same message.
            axios.post.mockResolvedValueOnce('Please input class for searching');

            //when

            //call signup function inside Login component
           await wrapper.instance().FindCourse();


            //then

            //generic test for post function call
            expect(axios.post).toHaveBeenCalledWith("/user/FindCourse", user)

            //substitue for response object on success
            expect(consoleSpy).toHaveBeenCalledWith('Please input class for searching');

        })

    })

});*/
