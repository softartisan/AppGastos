import React from 'react';
import {shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';


test('Should render Expenses summary with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expensesTotal={1000} expenseCount={1 }/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpensesSummary with multiple expense', () => {
  const wrapper = shallow(<ExpensesSummary expensesTotal={1000} expenseCount={2}/>);
  expect(wrapper).toMatchSnapshot();
});