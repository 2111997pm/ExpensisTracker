import React, { Fragment } from 'react'
import ExpenseList from './ExpenseList'
import ExpenseForm from './ExpenseForm'

const Expense = () => {
  return (
    <>
        <ExpenseForm/>
        <ExpenseList/>
    </>
  )
}

export default Expense