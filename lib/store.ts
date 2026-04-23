import type { Expense } from "../types/expense"

let expenses: Expense[] = []

export function addExpense(expense: Expense) {
  const exists = expenses.find(e => e.id === expense.id)

  if (exists) return exists  // idempotency

  expenses.push(expense)
  return expense
}

export function getExpenses() {
  return expenses
}