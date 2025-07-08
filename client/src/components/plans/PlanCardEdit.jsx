import { getToken } from "@/services/authService";
import axios from "axios";
import { Button } from "@/components/ui/button";
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
        <div>
            PlanCardEdit
            <Button onClick={handleDelete}>Delete</Button>
        </div>
    )
}

export default PlanCardEdit