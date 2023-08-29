import React, { useState, useEffect } from "react";
import "../../Style/Advert.css";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../../Context/AuthProvider";

function Advert(props) {
    const { advert_id, advert_title, advert_description, category_type, advert_selected, advert_active } = props.data;
    const [data, deleteData] = useState([]);
    const user = useAuthContext
    const token = localStorage.getItem('auth') ? localStorage.getItem('auth').replace(/"/g, '') : '';
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`http://${process.env.REACT_APP_MY_URL}/adverts/${advert_id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }).then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log("show me error that cannot be specify", err));

            if (res.status === 200) {
                deleteData(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (!advert_selected && advert_active) {
        return (
            <div className="advert">
                {/* <Link to={`/advert/${advert_id}`}> */}
                    <h1>{category_type}</h1>
                    <h2> {advert_title}</h2>
                    <p>{advert_description}</p>
                    {/* <button>Modifier</button> */}
                {/* </Link> */}
                <Link to={`/AdvertDetails/${advert_id}`}
                >+ d'info</Link>
                {/* <button onClick={handleSubmit}>Delete</button> */}

            </div>
        )
    }

}

export default Advert