import { useState, useEffect } from 'react'
import PlanCardCompact from '@/components/plans/PlanCardCompact'
import axios from 'axios'
import { getToken } from '@/services/authService'

const PlanForm = () => {
    const [plans, setPlans] = useState([])

    const getPlans = async () => {
        const token = getToken()
        
        // Set the header so the backend can grab for middleware
        const response = await axios.get("/api/plans", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setPlans(response.data.plans)
    }

    useEffect(() => {
        getPlans()
    }, [plans])

    return (
        <div>
            {plans.map((plan, index) => 
                <PlanCardCompact variant="compact" key={index} id={plan.id} title={plan.title} start_date={plan.start_date} end_date={plan.end_date} />
            )}
        </div>
    )
}

export default PlanForm
