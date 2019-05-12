import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Should return 0 if no expenses', () => {
  const total = getExpensesTotal();
  expect(total).toBe(0);
});

test('Should correctly add up a single expense', () => {
  const total = getExpensesTotal([expenses[0]]);
  expect(total).toBe(expenses[0].amount);
});

test('Should correctly add up multiple expenses', () => {
  const total = getExpensesTotal(expenses);
  expect(total).toBe(expenses[0].amount+ expenses[1].amount+ expenses[2].amount);
});