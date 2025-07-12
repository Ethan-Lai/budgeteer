import { useState, useEffect } from 'react'
import { getExpenses } from '@/services/expenseService'
import { formatDate } from '@/lib/utils'
import CreateExpenseModal from './CreateExpenseModal'

const ExpenseForm = ({ planId }) => {
    const [expenses, setExpenses] = useState([])

    const fetchExpenses = async () => {
        try {
            const expensesData = await getExpenses(planId)
            setExpenses(expensesData)
        } catch (err) {
            console.log("Error: ", err.message)
        }
    }

    useEffect(() => {
        fetchExpenses()
    }, [])

    return (
        <div>
            <CreateExpenseModal planId={planId} />
            {expenses.map((expense, index) => {
                return (
                    <div className="flex flex-col" key={index}>
                        <span>Amount:${expense.amount}</span>
                        <span>category: {expense.category}</span>
                        <span>description: {expense.description}</span>
                        <span>date: {formatDate(expense.date)}</span>
                        <br />
                    </div>
                )
            })}
        </div>
    )
}

export default ExpenseForm