import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "@/services/authService";
import axios from "axios";
import TripCard from "@/components/TripCard";

const TripDetails = () => {
    const { id } = useParams()
    const [tripDetails, setTripDetails] = useState([])

    const getTripDetails = async () => {
        const token = getToken()

        const response = await axios.get(`/api/trips/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setTripDetails(response.data.trip)
    }

    useEffect(() => {
        getTripDetails()
    }, [])

    return (
        <div>
            <h1 className="text-3xl">INSIDE TRIP PAGE {id}</h1>
            <TripCard title={tripDetails.title} start_date={tripDetails.start_date} end_date={tripDetails.end_date} />
        </div>
    )
}

export default TripDetails