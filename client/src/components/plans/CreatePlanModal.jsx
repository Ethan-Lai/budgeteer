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
import axios from "axios"
import { getToken } from "@/services/authService"
import { useNavigate } from "react-router-dom"

export function CreatePlanModal() {
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!startDate && !endDate) {
        setError("Both start and end dates are not valid dates!")
        return 
    }
    if (!startDate) {
        setError("Start Date is not a valid date!")
        return
    }
    if (!endDate) {
        setError("End Date is not a valid date!")
        return
    }

    if (endDate < startDate) {
        setError("End date cannot be before start date!")
        return
    }
    
    try {
        const token = getToken()
        const response = await axios.post('/api/plans', {
            title: title,
            start_date: startDate,
            end_date: endDate
        }, 
        {
            // Need this for the backend, auth to know which user is using token and content for JSON format
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        console.log('Plan created', response.data)
        navigate(`/app/plans/${response.data.plan.id}`)
    } catch (err) {
        console.log("Error ", err.message)
    }
    
    // Reset form
    setTitle("")
    setError("")
    setStartDate(undefined)
    setEndDate(undefined)
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
            <DialogTitle>Create a Plan</DialogTitle>
            <DialogDescription>
              Create a new plan with dates and title.
            </DialogDescription>
            {error && 
                <DialogDescription className="text-red-500">
                    {error}
                </DialogDescription>      
            }
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sweden Plan" 
                required
              />
            </div>
            <div className="grid gap-3">
              <Label>Start Date</Label>
              <DatePicker 
                date={startDate}
                onDateChange={setStartDate}
                placeholder="July 15, 2025"
                required={true}
              />
            </div>
            <div className="grid gap-3">
              <Label>End Date</Label>
              <DatePicker 
                date={endDate}
                onDateChange={setEndDate}
                placeholder="August 03, 2025"
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

export default CreatePlanModal