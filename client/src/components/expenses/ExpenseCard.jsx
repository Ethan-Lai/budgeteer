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
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { Label } from "../ui/label"
import { PenLine } from "lucide-react"
import { deleteExpense } from "@/services/expenseService"
import ConfirmationModal from "../ui/ConfirmationModal"
import ExpenseCardEdit from "./ExpenseCardEdit"
import { useState } from "react"

const ExpenseCard = ({ inEditView, id, planId, amount, category, description, date, onExpenseChange }) => {
    const [isEditing, setIsEditing] = useState(false)

    const handleDelete = async () => {
        try {
            await deleteExpense(planId, id)
            onExpenseChange()
        } catch (err) {
            console.log("Error: ", err.message)
        }
    }

    const handleSaveSuccess = () => {
        setIsEditing(false) // Exit edit mode
        onExpenseChange() // Refresh the list
    }

    return (
        <Card className={`flex flex-col p-5 ${!isEditing && "border-none"} dark:bg-input/30 shadow-sm bg-transparent`}>
            <div className={`flex flex-row justify-between items-center ${isEditing && "-mx-5 px-5 pb-5 border-b-1"}`}>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                        <Badge>{category}</Badge>   
                        <CardDescription className="text-sm">{formatDate(date)}</CardDescription>
                    </div>
                    <Label className="text-lg">{description}</Label>
                </div>
                <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">${amount}</CardTitle>
                    {inEditView &&
                        <>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-blue-400"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                <PenLine className="size-6" />
                                <span className="sr-only">Edit Button</span>
                            </Button>
                            <ConfirmationModal 
                                type="Delete" 
                                handleFunction={handleDelete} 
                                className="text-red-400" 
                                iconOnly={true} 
                            />
                        </>
                    }
                </div>
            </div>
            
            {/* Only show edit form when in edit mode */}
            {isEditing && (
                <ExpenseCardEdit 
                    isEditing={true} 
                    id={id} 
                    planId={planId} 
                    amount={amount} 
                    category={category} 
                    date={date} 
                    description={description} 
                    onSaveSuccess={handleSaveSuccess} 
                />
            )}
        </Card>
    )
}

export default ExpenseCard