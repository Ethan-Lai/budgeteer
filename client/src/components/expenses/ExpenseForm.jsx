import { useState, useEffect } from 'react'
import { getExpenses } from '@/services/expenseService'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CreateExpenseModal from './CreateExpenseModal'
import ExpenseCard from './ExpenseCard'

const ExpenseForm = ({ isEditing=false, planId }) => {
    const [expenses, setExpenses] = useState([])

    const handleExpenseChange = () => {
        fetchExpenses()
    }

    const fetchExpenses = async () => {
        try {
            const expensesData = await getExpenses(planId)
            setExpenses(expensesData)
        } catch (err) {
            console.log("Error: ", err.message)
        }
    }

    const totalExpenses = expenses.reduce((total, expense) => {
        return total + parseFloat(expense.amount)
    }, 0)

    useEffect(() => {
        fetchExpenses()
    }, [])

    return (
        <Card className="p-5">
            {isEditing ?
                <CreateExpenseModal planId={planId} onAddSuccess={handleExpenseChange} />
               :
                <div className="flex justify-between items-center -mx-5 px-5 pb-5 border-b-1">
                    <CardTitle className="text-2xl">Expenses</CardTitle>
                    <CardTitle className="text-3xl">${totalExpenses.toFixed(2)}</CardTitle>
                </div>
            }
            {expenses.map((expense, index) => {
                return (
                    <ExpenseCard key={index} isEditing={true} id={expense.id} planId={planId} amount={expense.amount} category={expense.category} date={expense.date} description={expense.description} onDeleteSuccess={handleExpenseChange} />
                )
            })}
        </Card>
    )
}

export default ExpenseForm