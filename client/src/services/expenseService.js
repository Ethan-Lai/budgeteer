import axios from "axios";
import { getToken } from "./authService";

export const getExpenses = async (planId) => {
    const token = getToken()

    const response = await axios.get(`/api/plans/${planId}/expenses`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return response.data.expenses
}

export const createExpense = async(planId, expenseData) => {
    const token = getToken()

    const response = await axios.post(`/api/plans/${planId}/expenses`, expenseData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    console.log("Expense successfully created", response.data)

    return response.data.expense
}

export const deleteExpense = async (planId, expenseId) => {
    const token = getToken()

    await axios.delete(`/api/plans/${planId}/expenses/${expenseId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log("Expense successfully deleted")
}

export const updateExpense = async (planId, expenseId, expenseData) => {
    const token = getToken()

    const response = await axios.put(`/api/plans/${planId}/expenses/${expenseId}`, expenseData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    console.log("Expense successfully updated")
    return response.data.editedExpense
}