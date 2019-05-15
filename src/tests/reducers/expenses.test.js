import expensesReducer from '../../reducers/expenses';
import testExpenses from '../fixtures/expenses';



test('Should set default state', () => {
  const state = expensesReducer(undefined,{type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const testAction = {
    type: 'REMOVE_EXPENSE',
    idToRemove: testExpenses[1].id
  }
  const state = expensesReducer(testExpenses, testAction);
  expect(state).toEqual([testExpenses[0], testExpenses[2]]);
});

test('should not remove expense by id if id not found', () => {
  const testAction = {
    type: 'REMOVE_EXPENSE',
    idToRemove: -1
  }
  const state = expensesReducer(testExpenses, testAction);
  expect(state).toEqual(testExpenses);
});

test('Should add an expense', () => {
  const tExpense = {
    id:'4',
    description:'sardina',
    note: '',
    amount: 666,
    createdAt: 0
  }
  const tAction = {
    type: 'ADD_EXPENSE',
    expense: tExpense
  }
  const state = expensesReducer(testExpenses, tAction);
  expect(state).toEqual([...testExpenses, tExpense]);
});

test('Should edit an expense', () => {
  const tUpdates = {
    description: 'lul'
  }
  const tAction = {
    type: 'EDIT_EXPENSE',
    id: '1',
    updates: tUpdates
  }
  const state = expensesReducer(testExpenses, tAction);
  expect(state).toEqual([
    {...testExpenses[0], description: 'lul'},
    testExpenses[1],
    testExpenses[2]
  ]);
});

test('Should not edit expense if expense not found', () => {
  const tUpdates = {
    description: 'lul'
  }
  const tAction = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: tUpdates
  }
  const state = expensesReducer(testExpenses, tAction);
  expect(state).toEqual(testExpenses);
})


test('Should set expenses', () => {
  const action = {type: 'SET_EXPENSES', expenses: [testExpenses[1]] }
  const state = expensesReducer(testExpenses, action);
  expect(state).toEqual([testExpenses[1]]);
})

