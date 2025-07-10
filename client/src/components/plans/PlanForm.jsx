import { useState, useEffect } from 'react'
import PlanCardCompact from '@/components/plans/PlanCardCompact'
import { getPlans } from '@/services/planService'

const PlanForm = () => {
    const [plans, setPlans] = useState([])

    const fetchPlans = async () => {
        try {
            const plansData = await getPlans()
            setPlans(plansData)
        } catch (err) {
            console.log('Error: ', err.message)
        }
    }

    useEffect(() => {
        fetchPlans()
    }, [])

    return (
        <div>
            {plans.map((plan, index) => 
                <PlanCardCompact variant="compact" key={index} id={plan.id} title={plan.title} start_date={plan.start_date} end_date={plan.end_date} />
            )}
        </div>
    )
}

export default PlanForm
