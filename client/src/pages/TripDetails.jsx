import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "@/services/authService";
import axios from "axios";
import TripCard from "@/components/TripCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TripDetails = () => {
    const { id } = useParams()
    const [tripDetails, setTripDetails] = useState([])
    const navigate = useNavigate()

    const getTripDetails = async () => {
        try {
            const token = getToken()
    
            const response = await axios.get(`/api/trips/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    
            setTripDetails(response.data.trip)
        } catch (err) {
            console.log("Access Denied")
            navigate('/app/trips')
        }
    }

    useEffect(() => {
        getTripDetails()
    }, [])

    const handleDelete = async () => {
        try {
            const token = getToken()

            await axios.delete(`/api/trips/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log("Trip successfully deleted")
            navigate('/app/trips')
        } catch (err) {
            console.log("Error deleting trip: ", err.message)
        }
    }

    return (
        <Tabs defaultValue="view">
            {/* Heading */}
            <div className="flex items-center justify-between -mx-5 px-5 pb-5 border-b-1">
                <div className="flex items-center">              
                    <button 
                        className="cursor-pointer"
                        onClick={() => navigate('/app/trips')}
                    >
                        <ChevronLeft />
                        <span className="sr-only">Back button</span>
                    </button>
                    <div className="ml-4">
                        <h1 className="text-2xl">Trip Details</h1>
                        <p className="text-md">View and manage your trip information</p>
                    </div>
                </div>
                <TabsList>
                    <TabsTrigger value="view">View Mode</TabsTrigger>
                    <TabsTrigger value="edit">Edit Mode</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="view" className="pt-5">
                <TripCard title={tripDetails.title} start_date={tripDetails.start_date} end_date={tripDetails.end_date} disabled={true} />
            </TabsContent>
            <TabsContent value="edit">
                <Button onClick={handleDelete}>Delete</Button>
            </TabsContent>
        </Tabs>
    )
}

export default TripDetails