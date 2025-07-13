import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "../ui/badge"
import { formatDate } from "@/lib/utils"
import { Label } from "../ui/label"

const ExpenseCard = ({ amount, category, description, date }) => {
    return (
        <Card className="p-5 border-none flex flex-row justify-between items-center dark:bg-input/30 shadow-sm bg-transparent">
            <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                    <Badge>{category}</Badge>   
                    <CardDescription className="text-sm">{formatDate(date)}</CardDescription>
                </div>
                <Label className="text-lg">{description}</Label>
            </div>
            <CardTitle className="text-xl">${amount}</CardTitle>
        </Card>
    )
}

export default ExpenseCard