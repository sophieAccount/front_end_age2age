import React, { useState, useEffect } from "react";
import "../../Style/EditAdvert.css";
import Advert from './Advert';

function EditAdvert() {

    const [data, setAdvert] = useState([]);
    const token = localStorage.getItem('auth').replace(/"/g, '');
    const userId = localStorage.getItem('userId').replace(/"/g, '');

    useEffect(() => {
        const headers = { 'Authorization': `Bearer ${token}` };
        fetch(`http://${process.env.REACT_APP_MY_URL}/adverts/user/${userId}`, { headers })
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