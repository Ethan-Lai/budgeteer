import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import { formatDate, getPlanStatus, getPlanDuration } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { useNavigate } from "react-router-dom"

const PlanCardCompact = ({ variant, id, title, start_date, end_date }) => {
    const formattedDate = `${formatDate(start_date)} - ${formatDate(end_date)}`
    const planStatus = getPlanStatus(start_date, end_date)
    const planDuration = getPlanDuration(start_date, end_date)
    const navigate = useNavigate()

    const badgeColor = planStatus === "Upcoming" 
        ? "bg-blue-500 dark:bg-purple-600"
        : planStatus === "Ongoing"
        ? "bg-indigo-500 dark:bg-indigo-600"
        : ""

    return(
        variant === "compact" ?
            <Card 
                className="p-5 cursor-pointer"
                onClick={() => navigate(`/app/plans/${id}`)}    
            >
                <div className="flex justify-between">
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <Badge 
                        variant="secondary"
                        className={`${badgeColor} text-sm`}
                    >
                        {planStatus}
                    </Badge>
                </div>
                <div className="flex items-center">
                    <Calendar />
                    <CardDescription className="text-lg pl-2">{formattedDate}</CardDescription>
                </div>
                <div className="flex items-center -mt-3">
                    <Clock />
                    <CardDescription className="text-lg pl-2">{planDuration}</CardDescription>
                </div>
            </Card>
            :
            <>
                <div className="flex justify-between">
                    <CardTitle className="text-4xl">{title}</CardTitle>
                    <Badge 
                        variant="secondary"
                        className={`${badgeColor} text-sm`}
                    >
                        {planStatus}
                    </Badge>
                </div>
                <div className="flex items-center -mx-5 px-5 pb-5 border-b-1 gap-10">
                    <div className="flex items-center">
                        <Calendar />
                        <CardDescription className="text-lg pl-2">{formattedDate}</CardDescription>
                    </div>
                    <div className="flex items-center">
                        <Clock />
                        <CardDescription className="text-lg pl-2">{planDuration}</CardDescription>
                    </div>
                </div>
            </>
    )
}

export default PlanCardCompact