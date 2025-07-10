import { getToken } from "@/services/authService";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DatePicker from "../ui/DatePicker";
import { formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PlanCardEdit = ({ isEditing=false, id, title, start_date, end_date, onSaveSuccess }) => {
    const navigate = useNavigate()
    const [editTitle, setEditTitle] = useState("")
    const [editStartDate, setEditStartDate] = useState("")
    const [editEndDate, setEditEndDate] = useState("")

    // NOTE: Do this instead of directly loading into state since we are waiting on async data
    //       Thus, need to display once the info has been passed down properly
    useEffect(() => {
        setEditTitle(title || "")
        setEditStartDate(formatDate(start_date) || "")
        setEditEndDate(formatDate(end_date) || "")
    }, [title, start_date, end_date]) 

    const handleDelete = async () => {
        try {
            const token = getToken()

            await axios.delete(`/api/plans/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log("Plan successfully deleted")
            navigate('/app/plans')
        } catch (err) {
            console.log("Error deleting plan: ", err.message)
        }
    }

    const handleSave = async (e) => {
        e.preventDefault()
        
        try {
            const token = getToken()
            const response = await axios.put(`/api/plans/${id}`, {
                title: editTitle,
                start_date: editStartDate,
                end_date: editEndDate
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (onSaveSuccess) {
                onSaveSuccess(response.data.editedPlan)
            }
            console.log("Plan edited successfully", response.data)
        } catch (err) {
            console.log("Error: ", err)
        }
    }

    return (
        <form onSubmit={handleSave}>
            <div className="grid gap-4">
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
                    <div>
                        <Button type="button" onClick={handleDelete}>Delete</Button>
                        <Button type="submit">Save</Button>
                        <Button type="button">Cancel</Button>
                    </div>
                )}
            </div>
        </form>
    )
}

export default PlanCardEdit