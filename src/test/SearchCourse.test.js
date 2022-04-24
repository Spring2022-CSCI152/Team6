import axios from '../axios';
import React from 'react';
import FindCourse from '../pages/SearchCourse';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime/runtime';

configure({ adapter: new Adapter() });

jest.mock('../axios');
jest.mock('../CSS/course.css');

describe('Search Course Function Test',  () => {
it('Should ', async () => {
    const wrapper = shallow(FindCourse)

    const finding = {"classNameAb": "", "className": ""};

    axios.post.mockResolvedValueOnce('');

    await wrapper.instance();

    expect(axios.post).toHaveBeenCalledWith('/course/search', finding)

});
    

})