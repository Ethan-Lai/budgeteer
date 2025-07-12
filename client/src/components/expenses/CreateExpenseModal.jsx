import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePicker from "../ui/DatePicker"
import { createExpense } from "@/services/expenseService"

export function CreateExpenseModal({ planId }) {
  const [amount, setAmount] = useState()
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState()
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!date) {
        setError("Date is not a valid date!")
        return
    }
    
    try {
        const expenseData = {
            amount: amount,
            category: category,
            description: description,
            date: date
        }
        await createExpense(planId, expenseData)
    } catch (err) {
        console.log("Error ", err.message)
    }
    
    // Reset form
    setDescription("")
    setError("")
    setDate(undefined)
    setAmount(undefined)
    setCategory("")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">Create Plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add an Expense</DialogTitle>
            <DialogDescription>
              Add a new expense with the amount, description, date and category.
            </DialogDescription>
            {error && 
                <DialogDescription className="text-red-500">
                    {error}
                </DialogDescription>      
            }
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input 
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={amount || ""}
                        onChange={(e) => setAmount(e.target.value)}
                        onBlur={(e) => {
                            // Format to 2 decimal places when user leaves the field
                            const num = parseFloat(e.target.value);
                            if (!isNaN(num)) {
                                setAmount(num.toFixed(2));
                            }
                        }}
                        placeholder="0.00"
                        className="pl-8"
                        required
                    />
                </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Food" 
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="McDonald's" 
                required
              />
            </div>
            <div className="grid gap-3">
              <Label>Date</Label>
              <DatePicker 
                date={date}
                onDateChange={setDate}
                placeholder="July 15, 2025"
                required={true}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create Plan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateExpenseModal