import axios from "axios";
import { getToken } from "./authService";

export const getPlans = async () => {
    const token = getToken()
    
    // Set the header so the backend can grab for middleware
    const response = await axios.get("/api/plans", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return response.data.plans
}

export const getPlan = async (planId) => {
    const token = getToken()

    const response = await axios.get(`/api/plans/${planId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return response.data.plan
}

export const createPlan = async (planData) => {
    const token = getToken()

    const response = await axios.post('/api/plans', planData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    )

    console.log('Plan has been successfully created', response.data)
    return response.data.plan
}

export const updatePlan = async (planId, planData) => {
    // grab token
    const token = getToken()

    // axios put
    const response = await axios.put(`/api/plans/${planId}`, planData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    // return updated plan
    console.log('Plan successfully updated')
    return response.data.editedPlan
}

export const deletePlan = async (planId) => {
    const token = getToken()

    await axios.delete(`/api/plans/${planId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log("Plan successfully deleted")
}