const User = ({ name, username, email }) => {
    return(
        <div>
            <h1>Name: {name}</h1>
            <h1>Username: {username}</h1>
            <h1>Email: {email}</h1>
            <br />
        </div>
    )
}

export default User