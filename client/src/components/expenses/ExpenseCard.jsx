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
import { PenLine } from "lucide-react"
import { deleteExpense } from "@/services/expenseService"
import ConfirmationModal from "../ui/ConfirmationModal"

const ExpenseCard = ({ id, planId, amount, category, description, date, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            await deleteExpense(planId, id)
            onDeleteSuccess()
        } catch (err) {
            console.log("Error: ", err.message)
        }
    }

    return (
        <Card className="p-5 border-none flex flex-row justify-between items-center dark:bg-input/30 shadow-sm bg-transparent">
            <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                    <Badge>{category}</Badge>   
                    <CardDescription className="text-sm">{formatDate(date)}</CardDescription>
                </div>
                <Label className="text-lg">{description}</Label>
            </div>
            <div className="flex items-center gap-3">
                <CardTitle className="text-xl">${amount}</CardTitle>
                <PenLine className="text-blue-400"/>
                <ConfirmationModal type="Delete" handleFunction={handleDelete} className="text-red-400" iconOnly={true} />
            </div>
        </Card>
    )
}

export default ExpenseCard