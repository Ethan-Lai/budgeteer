import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "@/services/authService";
import axios from "axios";
import PlanCardExpanded from "@/components/plans/PlanCardExpanded";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import PlanCardEdit from "@/components/plans/PlanCardEdit";
import { getPlan } from "@/services/planService";

const PlanDetails = () => {
    const { id } = useParams()
    const [planDetails, setPlanDetails] = useState([])
    const navigate = useNavigate()

    const handleSaveSuccess = (updatedPlan) => {
        setPlanDetails(updatedPlan)
    }

    const getPlanDetails = async () => {
        try {
            const plan = await getPlan(id)
            setPlanDetails(plan)
        } catch (err) {
            console.log("Access Denied")
            navigate('/app/plans')
        }
    }

    useEffect(() => {
        getPlanDetails()
    }, [])

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
                <PlanCardExpanded id={id} title={planDetails.title} start_date={planDetails.start_date} end_date={planDetails.end_date} />
            </TabsContent>
            <TabsContent value="edit" className="pt-5">
                <Card className="p-5">
                    <PlanCardEdit isEditing={true} id={id} title={planDetails.title} start_date={planDetails.start_date} end_date={planDetails.end_date} onSaveSuccess={handleSaveSuccess} />
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default PlanDetails