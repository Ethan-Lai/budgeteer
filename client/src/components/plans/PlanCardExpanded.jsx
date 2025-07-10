import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PlanCardCompact from "./PlanCardCompact"
import PlanCardEdit from "./PlanCardEdit"

const PlanCardExpanded = ({ id, title, start_date, end_date }) => {
    return(
        <Card 
            className="p-5" 
        >
            {/* Heading */}
            <PlanCardCompact variant="expanded" id={id} title={title} start_date={start_date} end_date={end_date} />

            <PlanCardEdit id={id} title={title} start_date={start_date} end_date={end_date} />
        </Card>
    )
}

export default PlanCardExpanded