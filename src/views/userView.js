import React, { useState, useEffect } from "react";

function User() {
    const [data, setUser] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);

    return (
        <div>
            {data.map(data => <h1>{data.name} {data.surname}</h1>)}
        </div>
    );
}
export default User;