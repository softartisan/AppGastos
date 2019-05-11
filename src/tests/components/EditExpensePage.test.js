import React from 'react';
import {shallow } from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';
import { addExpense } from '../../actions/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      removeExpense={removeExpense}
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
  expect(editExpense).toHaveBeenCalledWith(expenses[2].id, expenses[2]);
});

test('Should handle removeExpense', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(history.push).toHaveBeenCalledWith('/');
  expect(removeExpense).toHaveBeenCalledWith({id: expenses[2].id});
});


