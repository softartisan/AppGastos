import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should setup remove expense action object', () => {
	const action = removeExpense({id: '123abc'});
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		idToRemove: '123abc'
	});
});


test('should setup edit expense action object', () => {
	const action = editExpense('123',{note:'New note value'});
	expect(action).toEqual({
		id: '123',
		type: 'EDIT_EXPENSE',
		updates: {
			note: 'New note value'
		}
	});
});

test('should setup add expense action object with provided values', () => {
	const expenseData = {
		description:'hamburger',
		amount:'10000',
		createdAt: '1000',
		note: ''
	}
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type:'ADD_EXPENSE',
		expense:{
			...expenseData,
			id: expect.any(String)
		}
	});
});

test('should setup add expense action object with default values', () => {
	const defaultExpenseData = {
		description: '',
		amount: 0,
		createdAt: 0,
		note: ''
	}
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
		...defaultExpenseData,
		id: expect.any(String)
	}});
});


