import {shallow } from 'enzyme';
import React from 'react';
import {LoginPage} from '../../components/LoginPage';


test('Should render LoginPage', () => {
  const wrapper = shallow(<LoginPage/>);
  expect(wrapper).toMatchSnapshot();
})


test('Should call startLogin on button click', () => {
  const startLogin = jest.fn();
  const wrapper = shallow( <LoginPage startLogin={startLogin} /> );
  wrapper.find('button').at(0).simulate('click');
  expect(startLogin).toHaveBeenCalled();
})