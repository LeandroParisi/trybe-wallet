import React, { Component } from 'react';
import DashboardControlValues from './sub-components/DashboardControlValues';
import { calculateIncomesAndExpenses } from '../utils'
import './style_sheets/MonthlyBalance.css'

function MonthlyBalance ({ className, transactions }) {
  const { incomes, expenses } = calculateIncomesAndExpenses(transactions)
  const result = expenses - incomes;
  const resultType = result > 0 ? 'Expense' : 'Incomes'
  
  return (
    <div className="dashboard-control-container">
    <span className="mini-title">Monthly Balance:</span>
      <section className={ className }>
          <div class="monthly-balance-flex-line">
            <h4>Incomes</h4>
            <p>{ Math.round((incomes * 100) / 100).toFixed(2) }</p>
          </div>
          <div class="monthly-balance-flex-line">
            <h4>Expenses</h4>
            <p>-{ Math.round((expenses * 100) / 100).toFixed(2) }</p>
          </div>
          <hr />
      
      <DashboardControlValues value={ result } transactionType={ resultType }/>

      </section>
    </div>
  )
}

export default MonthlyBalance;