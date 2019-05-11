import filtersReducer from '../../reducers/filters';
import moment from 'moment';
import { filter } from 'minimatch';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});


test('should setup sortBy to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  }
  const action = {
    type:'SORT_BY_DATE'
  }
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
  const testAction = {
    text: 'e',
    type: 'SET_TEXT_FILTER'
  }
  const state = filtersReducer(undefined, testAction);
  expect(state.text).toBe(testAction.text);
});

test('Should set startDate filter', () => {
  const testAction = {
    startDate: moment(0),
    type: 'SET_START_DATE'
  }
  const state = filtersReducer(undefined, testAction);
  expect(state.startDate).toBe(testAction.startDate);
});

test('Should set endDate filter', () => {
  const testAction = {
    endDate: moment(0),
    type: 'SET_END_DATE'
  }
  const state = filtersReducer(undefined, testAction);
  expect(state.endDate).toBe(testAction.endDate);
});

