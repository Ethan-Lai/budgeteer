import { getToken } from "@/services/authService";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DatePicker from "../ui/DatePicker";
import { formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const PlanCardEdit = ({ isEditing=false, id, title, start_date, end_date }) => {
    const navigate = useNavigate()

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

    return (
        <div className="grid gap-4">
            <div className="grid gap-3">
                <Label htmlFor="title" className="text-md">Title</Label>
                <Input 
                    id="title" 
                    defaultValue={title}
                    required={true}
                    className="md:text-md "
                    disabled={!isEditing}
                />
            </div>

            <div className="grid gap-3">
                <Label className="text-md">Start Date</Label>
                <DatePicker 
                    date={formatDate(start_date)}
                    required={true}
                    className="md:text-md"
                    disabled={!isEditing}
                />
            </div>

            <div className="grid gap-3">
                <Label className="text-md">End Date</Label>
                <DatePicker 
                    date={formatDate(end_date)}
                    required={true}
                    className="md:text-md"
                    disabled={!isEditing}
                />
            </div>

            {isEditing && (
                <div>
                    <Button onClick={handleDelete}>Delete</Button>
                    <Button onClick={() => console.log(isEditing)}>Save</Button>
                    <Button>Cancel</Button>
                </div>
            )}
        </div>
    )
}

export default PlanCardEdit