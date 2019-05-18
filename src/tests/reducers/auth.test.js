import authReducer from '../../reducers/auth';

// test('Should add an expense', () => {
//   const tExpense = {
//     id:'4',
//     description:'sardina',
//     note: '',
//     amount: 666,
//     createdAt: 0
//   }
//   const tAction = {
//     type: 'ADD_EXPENSE',
//     expense: tExpense
//   }
//   const state = expensesReducer(testExpenses, tAction);
//   expect(state).toEqual([...testExpenses, tExpense]);
// });

test('Should login', () => {
  const action = {
    type: 'LOGIN',
    uid: '123'
  }
  const state = authReducer(undefined, action);
  expect(state.uid).toBe('123');
})


test('Should logout', () => {
  const action = {
    type: 'LOGOUT'
  }
  const state = authReducer(undefined, action);
  expect(state).toEqual({});
})