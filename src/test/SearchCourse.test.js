import axios from '../axios';
import React from 'react';
import FindCourse from '../pages/SearchCourse';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime/runtime';

configure({ adapter: new Adapter() });

jest.mock('../axios');
jest.mock('../CSS/course.css');

describe('SearchCourse Functional Component', () => {
    const wrapper = shallow(<FindCourse />)

    it('should render a text input tag (search box)', () => {

        expect(wrapper.find('input[name="finding"]').exists()).toBe(true);
    });

    it('should render a submit button', () =>{
        expect(wrapper.find('button[name="submit"]').exists()).toBe(true);
    })

    it('the default value for text input box should be empty', () => {

        expect(wrapper.find('input[name="finding"]').prop('value')).toBe("");
    });

    it('on change of value in the field, the state of that field in the component should be updated', () => {

        //simulate text box entry of 'CSCI 1'
        wrapper.find('input[name="finding"]').simulate('change', { target: { value: 'CSCI 1' } });

        //verify change to state
        expect(wrapper.find('input[name="finding"]').prop('value')).toBe('CSCI 1');
    })


    const finding = { "classNameAb": "", "className": "" };

    axios.post.mockResolvedValueOnce('');

    // await wrapper.instance();

    // expect(axios.post).toHaveBeenCalledWith('/course/search', finding)

});
