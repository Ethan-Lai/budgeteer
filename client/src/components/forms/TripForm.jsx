import { useState, useEffect } from 'react'
import TripCard from '@/components/TripCard'
import axios from 'axios'
import { getToken } from '@/services/authService'

const TripForm = () => {
    const [trips, setTrips] = useState([])

    const getTrip = async () => {
        const token = getToken()
        
        // Set the header so the backend can grab for middleware
        const response = await axios.get("/api/trips", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setTrips(response.data.trips)
    }

    useEffect(() => {
        getTrip()
    }, [])

    return (
        <div>
            {trips.map((trip, index) => 
                <TripCard key={index} title={trip.title} start_date={trip.start_date} end_date={trip.end_date} />
            )}
        </div>
    )
}

export default TripForm
