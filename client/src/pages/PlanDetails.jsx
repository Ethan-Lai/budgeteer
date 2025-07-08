import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "@/services/authService";
import axios from "axios";
import PlanCard from "@/components/plans/PlanCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlanDetails = () => {
    const { id } = useParams()
    const [planDetails, setPlanDetails] = useState([])
    const navigate = useNavigate()

    const getPlanDetails = async () => {
        try {
            const token = getToken()
    
            const response = await axios.get(`/api/plans/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    
            setPlanDetails(response.data.plan)
        } catch (err) {
            console.log("Access Denied")
            navigate('/app/plans')
        }
    }

    useEffect(() => {
        getPlanDetails()
    }, [])

    const handleDelete = async () => {
        try {
            const token = getToken()

            await axios.delete(`/api/plans/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log("Plan successfully deleted")
            navigate('/app/plans')
        } catch (err) {
            console.log("Error deleting plan: ", err.message)
        }
    }

    return (
        <Tabs defaultValue="view">
            {/* Heading */}
            <div className="flex items-center justify-between -mx-5 px-5 pb-5 border-b-1">
                <div className="flex items-center">              
                    <button 
                        className="cursor-pointer"
                        onClick={() => navigate('/app/plans')}
                    >
                        <ChevronLeft />
                        <span className="sr-only">Back button</span>
                    </button>
                    <div className="ml-4">
                        <h1 className="text-2xl">Plan Details</h1>
                        <p className="text-md">View and manage your plan information</p>
                    </div>
                </div>
                <TabsList>
                    <TabsTrigger value="view">View Mode</TabsTrigger>
                    <TabsTrigger value="edit">Edit Mode</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="view" className="pt-5">
                <PlanCard title={planDetails.title} start_date={planDetails.start_date} end_date={planDetails.end_date} disabled={true} />
            </TabsContent>
            <TabsContent value="edit">
                <Button onClick={handleDelete}>Delete</Button>
            </TabsContent>
        </Tabs>
    )
}

export default PlanDetails