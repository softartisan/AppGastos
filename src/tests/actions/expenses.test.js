import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, startRemoveExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {

	const expensesData = {}
	//Convierto expenses array A expenses array de Firebase.
	expenses.forEach(({id, description, note, amount, createdAt}) => {
		expensesData[id] = {description, note, amount, createdAt}
	})

	database.ref('expenses').set(expensesData).then(() => {
		done();
	})

})

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
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

test('Should add expense to database and store', (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: 'Mouse',
		amount: 3000,
		note: 'This one is better',
		createdAt: 1000
	}
	store.dispatch(startAddExpense(expenseData)).then(() =>{

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {id: expect.any(String), ...expenseData }
		}) 
		
		//return snapshot
		return database.ref(`expenses/${actions[0].expense.id}`).once('value');

	}).then((snapshot) => {

		expect(snapshot.val()).toEqual(expenseData);
		done();
	})

})

test('Should add expense with default values to database and store', (done) => {

	const defaultExpense = {
		description: '',
		note: '',
		amount: 0,
		createdAt: 0 
	}

	const store = createMockStore({});

	store.dispatch(startAddExpense()).then(() =>{

		const actions = store.getActions();

		expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {id: expect.any(String), ...defaultExpense }
		}) 
		
		//return snapshot
		return database.ref(`expenses/${actions[0].expense.id}`).once('value');

	}).then((snapshot) => {

		expect(snapshot.val()).toEqual(defaultExpense);
		done();

	})

});


test('Should set up expense action object with data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({type: 'SET_EXPENSES', expenses });
});

test('Should fetch the expenses from firebase', (done) => {
	const store = createMockStore({});

	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual( { type: 'SET_EXPENSES', expenses } );
		done();
	})

});

test('Should remove expenses from firebase', (done) => {
	const store = createMockStore({});

	store.dispatch(startRemoveExpense(expenses[1])).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual(	{type: 'REMOVE_EXPENSE', idToRemove: expenses[1].id }	);
		//Retorno el objeto recién eliminado que deberia retornar null.
		return database.ref(`expenses/${expenses[1].id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
	})

})

test('Should edit expense from firebase', (done) => {
	const store = createMockStore({});
	store.dispatch(startEditExpense(expenses[1].id, {description: 'test', amount:'666', note: '', createdAt: '6666'})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual( {
			type: 'EDIT_EXPENSE', 
			id: expenses[1].id, 
			updates: {description: 'test', amount:'666', note: '', createdAt: '6666'}  
		});
		return database.ref(`expenses/${expenses[1].id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual( {description: 'test', amount:'666', note: '', createdAt: '6666'});
		done();
	});
})





