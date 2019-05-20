import React from 'react';
import {connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    const formattedExpenseTotal = numeral(props.expensesTotal).format('$0,000');
    const expenseWord = props.expenseCount===1 ? 'gasto' : 'gastos';
  return (
    <div className="page-header">
      <div className='content-container'>
        <h1 className='page-header__title'>Viendo <span>{props.expenseCount}</span> {expenseWord} con un total de <span>{formattedExpenseTotal}</span></h1>
        <div className='page-header__actions'>
          <Link className="button" to='/create'>Nuevo Gasto</Link>
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expensesTotal: getExpensesTotal(visibleExpenses),
    expenseCount: visibleExpenses.length
  }
}

export default connect(mapStateToProps)(ExpensesSummary);