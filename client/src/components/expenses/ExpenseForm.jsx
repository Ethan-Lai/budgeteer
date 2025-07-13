import { useState, useEffect } from 'react'
import { getExpenses } from '@/services/expenseService'
import { formatDate } from '@/lib/utils'
import CreateExpenseModal from './CreateExpenseModal'
import ExpenseCard from './ExpenseCard'

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
                    <ExpenseCard key={index} amount={expense.amount} category={expense.category} date={expense.date} description={expense.description} />
                )
            })}
        </div>
    )
}

export default ExpenseForm