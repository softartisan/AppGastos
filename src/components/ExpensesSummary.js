import React from 'react';
import {connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    const formattedExpenseTotal = numeral(props.expensesTotal).format('$0,000');
    const expenseWord = props.expenseCount===1 ? 'expense' : 'expenses';
  return (
    <div>
    <h3>Viewing {props.expenseCount} {expenseWord} totalling {formattedExpenseTotal}</h3>
    </div>
  );
}


const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expesesTotal: getExpensesTotal(visibleExpenses),
    expenseCount: visibleExpenses.length
  }
}

export default connect(mapStateToProps)(ExpensesSummary);