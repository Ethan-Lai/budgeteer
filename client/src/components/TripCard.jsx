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
import { formatDate, getTripStatus, getTripDuration } from "@/lib/utils"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"

const TripCard = ({ id, title, start_date, end_date, disabled=false }) => {
    const formattedDate = `${formatDate(start_date)} - ${formatDate(end_date)}`
    const tripStatus = getTripStatus(start_date, end_date)
    const tripDuration = getTripDuration(start_date, end_date)
    const navigate = useNavigate()

    const badgeColor = tripStatus === "Upcoming" 
        ? "bg-blue-500 dark:bg-purple-600"
        : tripStatus === "Ongoing"
        ? "bg-indigo-500 dark:bg-indigo-600"
        : ""

    return(
        <Card 
            className={`p-5 ${disabled ? "" : "cursor-pointer" }`}
            onClick={disabled ? undefined : () => navigate(`/app/trips/${id}`)}    
        >
            <div className="flex justify-between">
                <CardTitle className="text-2xl">{title}</CardTitle>
                <Badge 
                    variant="secondary"
                    className={`${badgeColor} text-sm`}
                >
                    {tripStatus}
                </Badge>
            </div>
            <div className="flex items-center">
                <Calendar />
                <CardDescription className="text-lg pl-2">{formattedDate}</CardDescription>
            </div>
            <div className="flex items-center -mt-3">
                <Clock />
                <CardDescription className="text-lg pl-2">{tripDuration}</CardDescription>
            </div>
        </Card>
    )
}

export default TripCard