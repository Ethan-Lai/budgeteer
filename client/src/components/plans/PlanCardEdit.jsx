import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DatePicker from "../ui/DatePicker";
import { formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deletePlan, updatePlan } from "@/services/planService";
import ConfirmationModal from "../ui/ConfirmationModal";

const PlanCardEdit = ({ isEditing=false, id, title, start_date, end_date, onSaveSuccess }) => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [editTitle, setEditTitle] = useState("")
    const [editStartDate, setEditStartDate] = useState()
    const [editEndDate, setEditEndDate] = useState()

    // NOTE: Do this instead of directly loading into state since we are waiting on async data
    //       Thus, need to display once the info has been passed down properly
    useEffect(() => {
        setEditTitle(title || "")
        setEditStartDate(formatDate(start_date) || "")
        setEditEndDate(formatDate(end_date) || "")
    }, [title, start_date, end_date]) 

    const handleDelete = async () => {
        try {
            await deletePlan(id)
            navigate('/app/plans')
        } catch (err) {
            console.log("Error deleting plan: ", err.message)
        }
    }

    const handleSave = async (e) => {
        e.preventDefault()

        if (!editStartDate && !editEndDate) {
            setError("Both start and end dates are not valid dates!")
            return 
        }
        if (!editStartDate) {
            setError("Start Date is not a valid date!")
            return
        }
        if (!editEndDate) {
            setError("End Date is not a valid date!")
            return
        }

        // Cant compare dates as strings, must turn to objects
        const startDateObj = new Date(editStartDate)
        const endDateObj = new Date(editEndDate)

        if (endDateObj < startDateObj) {
            setError("End date cannot be before start date!")
            return
        }
    
        try {
            const planData = {
                title: editTitle,
                start_date: editStartDate,
                end_date: editEndDate
            }
            const updatedPlan = await updatePlan(id, planData)

            if (onSaveSuccess) {
                onSaveSuccess(updatedPlan)
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
                    <Label htmlFor="title" className="text-md">Title</Label>
                    <Input 
                        id="title" 
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        required={true}
                        className="md:text-md"
                        disabled={!isEditing}
                    />
                </div>

                <div className="grid gap-3">
                    <Label className="text-md">Start Date</Label>
                    <DatePicker 
                        date={editStartDate}
                        onDateChange={setEditStartDate}
                        required={true}
                        className="md:text-md"
                        disabled={!isEditing}
                    />
                </div>

                <div className="grid gap-3">
                    <Label className="text-md">End Date</Label>
                    <DatePicker 
                        date={editEndDate}
                        onDateChange={setEditEndDate}
                        required={true}
                        className="md:text-md"
                        disabled={!isEditing}
                    />
                </div>

                {isEditing && (
                    <div className="flex justify-end gap-3">
                        <Button type="submit">Save</Button>
                        <ConfirmationModal type="Delete" handleFunction={handleDelete} className="bg-red-500" />
                    </div>
                )}
            </div>
        </form>
    )
}

export default PlanCardEdit