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
import DatePicker from "../DatePicker"

export function TripForm() {
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const tripData = {
      title,
      start_date: startDate,
      end_date: endDate
    }
    
    if (!tripData.start_date && !tripData.end_date) {
        setError("Both start and end dates are not valid dates!")
        return 
    }
    if (!tripData.start_date) {
        setError("Start Date is not a valid date!")
        return
    }
    if (!tripData.end_date) {
        setError("End Date is not a valid date!")
        return
    }
    
    // TODO: Send to your API
    // await fetch('/api/trips', { 
    //   method: 'POST', 
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(tripData) 
    // })
    
    // Reset form
    setTitle("")
    setError("")
    setStartDate(undefined)
    setEndDate(undefined)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Trip</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a Trip</DialogTitle>
            <DialogDescription>
              Create a new trip with dates and title.
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
                placeholder="Sweden Trip" 
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
            <Button type="submit">Create Trip</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TripForm