import React from 'react';
import {shallow } from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';
import { addExpense } from '../../actions/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[2]}
    />
  );
});

test('Should render EditExpensePage',() => {
  expect(wrapper).toMatchSnapshot();
});

test('Should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenCalledWith('/');
  expect(startEditExpense).toHaveBeenCalledWith(expenses[2].id, expenses[2]);
});

test('Should handle removeExpense', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(history.push).toHaveBeenCalledWith('/');
  expect(startRemoveExpense).toHaveBeenCalledWith({id: expenses[2].id});
});


