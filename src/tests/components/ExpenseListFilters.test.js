import React from 'react';
import {connect } from 'react-redux';
import {shallow } from 'enzyme';
import {ExpenseListFilters } from '../../components/ExpenseListFilters';
import {filters, altFilters} from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  setEndDate = jest.fn();
  setStartDate = jest.fn();
  wrapper = shallow (
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setEndDate={setEndDate}
      setStartDate={setStartDate}
    />
  );
});

test('Should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

//SHOULD HANDLE TEXT CHANGE
test('Should handle text change', () => {
  const testText = 'E';
  wrapper.find('input').at(0).simulate('change',{
    target: {value: testText}
  });
  expect(setTextFilter).toHaveBeenCalledWith(testText);
});
//SHOULD SORT BY DATE
test('Should sort by date', () => {
  const sort = 'date';
  wrapper.find('select').at(0).simulate('change', {
    target: {value: sort}
  });
  expect(sortByDate).toHaveBeenCalled();
});
//SHOULD SORT BY AMOUNT
test('Should sort by date', () => {
  const sort = 'amount';
  wrapper.find('select').at(0).simulate('change', {
    target: {value: sort}
  });
  expect(sortByAmount).toHaveBeenCalled();
});

//SHOULD HANDLE DATE CHANGES
test('Should handle date changes', () => {
  const startDate = moment(0);
  const endDate = moment(0).add(1, 'years');
  wrapper.find('DateRangePicker').at(0).prop('onDatesChange')({startDate, endDate});
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

//SHOULD HANDLE DATE FOCUS CHANGE
test('Should handle date focus change', () => {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').at(0).prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});

