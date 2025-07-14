import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DatePicker from "../ui/DatePicker";
import { formatDate } from "@/lib/utils";
import { useState, useEffect } from "react";
import { updateExpense } from "@/services/expenseService";

const ExpenseCardEdit = ({ id, planId, amount, category, date, description, onSaveSuccess }) => {
    const [editAmount, setEditAmount] = useState()
    const [editCategory, setEditCategory] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [editDate, setEditDate] = useState()
    const [error, setError] = useState("")


    // NOTE: Do this instead of directly loading into state since we are waiting on async data
    //       Thus, need to display once the info has been passed down properly
    useEffect(() => {
        setEditAmount(amount || "")
        setEditCategory(category || "")
        setEditDescription(description || "")
        setEditDate(formatDate(date) || "")
    }, [amount, category, description, date]) 

    const handleSave = async (e) => {
        e.preventDefault()

        if (!editDate) {
            setError("Date is not a valid date!")
            return
        }
    
        try {
            const expenseData = {
                amount: editAmount,
                category: editCategory,
                description: editDescription,
                date: editDate
            }
            const updatedExpense = await updateExpense(planId, id, expenseData)

            if (onSaveSuccess) {
                onSaveSuccess()
            }
        } catch (err) {
            console.log("Error: ", err)
        }

        setError("")
    }

    return (
        <form onSubmit={handleSave}>
            <div className="grid gap-4">
                {error && 
                    <span className="text-red-400">
                        {error}
                    </span>
                }

                <div className="grid gap-3">
                    <Label className="text-md" htmlFor="amount">Amount</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span> 
                        <Input 
                            id="amount"
                            type="number"
                            step="0.01"
                            min="0"
                            value={editAmount || ""}
                            onChange={(e) => setEditAmount(e.target.value)}
                            onBlur={(e) => {
                                // Format to 2 decimal places when user leaves the field
                                const num = parseFloat(e.target.value);
                                if (!isNaN(num)) {
                                    setEditAmount(num.toFixed(2));
                                }
                            }}
                            placeholder="0.00"
                            className="pl-8"
                            required
                        />
                    </div>
                </div>


                <div className="grid gap-3">
                    <Label className="text-md" htmlFor="category">Category</Label>
                    <Input 
                        id="category"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        placeholder="Food" 
                        required
                    />
                </div>

                <div className="grid gap-3">
                    <Label className="text-md" htmlFor="description">Description</Label>
                    <Input 
                        id="description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="McDonald's" 
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <Label className="text-md">Date</Label>
                    <DatePicker 
                        date={editDate}
                        onDateChange={setEditDate}
                        placeholder="July 15, 2025"
                        required={true}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <Button type="submit">Save</Button>
                </div>
            </div>
        </form>
    )
}

export default ExpenseCardEdit