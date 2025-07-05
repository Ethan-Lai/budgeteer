const Trip = ({ title, start_date, end_date }) => {
    return(
        <div>
            <h1>Title: {title}</h1>
            <h1>Start Date: {start_date}</h1>
            <h1>End Date: {end_date}</h1>
            <br />
        </div>
    )
}

export default Trip