import uuid from 'uuid';
import database from '../firebase/firebase';

//ADD_EXPENSE
const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
    description = '',
    note ='',
    amount = 0,
    createdAt = 0 
    } = expenseData;

    const expense = {
      description,
      note,
      amount,
      createdAt
    }

    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id:ref.key,
        ...expense
      }));
    });

  }
}



//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    idToRemove: id
});

const startRemoveExpense = ({id} = {}) => {

  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({id}));
    })
  }

}


//EDIT_EXPENSE
const editExpense = (id,updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const startEditExpense = (id, updates) => {
// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// });
  return (dispatch) => {
    return database.ref(`expenses/${id}`).update({
      ...updates
    }).then(() => {
      dispatch(editExpense(id, updates));
    })
  }

}

//SET_EXPENSES
const setExpenses = (expenses) => {
  return { type: 'SET_EXPENSES', expenses }
}

const startSetExpenses = () => {
  //Retorno una función
  return (dispatch) => {
    //Saco expenses desde firebase y las guardo en expenses
    //Retorno esta Promise
    return database.ref('expenses').once('value').then((snapshot) => {

      const expenses = [];
      //Por cada objeto de firebase lleno un objeto del array expenses
      snapshot.forEach((childSnapshot) => {
        expenses.push( {id: childSnapshot.key, ...childSnapshot.val()} );
      });

      dispatch(setExpenses(expenses));

    });
  }
}

export {
    startEditExpense,
    editExpense,
    removeExpense,
    startRemoveExpense,
    addExpense,
    startAddExpense,
    setExpenses,
    startSetExpenses
}