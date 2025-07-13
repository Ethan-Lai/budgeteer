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