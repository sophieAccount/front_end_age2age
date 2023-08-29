import React, { useState, useEffect } from "react";
import "../../Style/EditAdvert.css";
import Advert from './Advert';
import { useAuthContext } from "../../Context/AuthProvider";

function EditAdvert() {

    const [data, setAdvert] = useState([]);
    const token = localStorage.getItem('auth').replace(/"/g, '');
    const userId = localStorage.getItem('userId').replace(/"/g, '');
    const { config } = useAuthContext();

    useEffect(() => {
        const headers = { 'Authorization': `Bearer ${token}` };
        fetch(`https://${config}/adverts/user/${userId}`, { headers })
            .then((res) => res.json())
            .then((data) => setAdvert(data));
    }, []);

    const myAdverts = data.map(data => {
        return <Advert key={data.advert_id} data={data} />
    });

    return (
        <div className="EditAdvert">
            <div className="MyAdverts">
                {myAdverts}
            </div>
        </div>
    )
}

export default EditAdvert