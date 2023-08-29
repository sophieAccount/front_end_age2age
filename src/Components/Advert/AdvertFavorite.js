import React, { useState, useEffect } from "react";
import "../../Style/AdvertFavorite.css";
import Advert from './Advert';
import { useAuthContext } from  "../../Context/AuthProvider";

function AdvertFavorite() {

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
        <div className="AdvertFavorite">
            <div className="MyAdverts">
                {myAdverts}
            </div>
        </div>
    )
}

export default AdvertFavorite