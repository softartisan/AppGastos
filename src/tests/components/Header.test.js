import React from 'react';
import {shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Header from '../../components/Header';
//react-test-renderer

test('Should render Header correctly', () => {
  const wrapper = shallow(<Header/>);
  expect(toJSON(wrapper)).toMatchSnapshot();
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header/>);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});
