import { getToken } from "@/services/authService";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DatePicker from "../ui/DatePicker";
import { formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const PlanCardEdit = ({ id, title, start_date, end_date }) => {
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
        <div className="grid gap-4 py-4">
            <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input 
                    id="title" 
                    defaultValue={title}
                    required={true}
                />
            </div>

            <div className="grid gap-3">
                <Label>Start Date</Label>
                <DatePicker 
                    date={formatDate(start_date)}
                    required={true}
                />
            </div>

            <div className="grid gap-3">
                <Label>End Date</Label>
                <DatePicker 
                    date={formatDate(end_date)}
                    value={formatDate(end_date)}
                    required={true}
                />
            </div>

            <div>
                <Button onClick={handleDelete}>Delete</Button>
                <Button>Save</Button>
                <Button>Cancel</Button>
            </div>
        </div>
    )
}

export default PlanCardEdit