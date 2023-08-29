import React, { useState, useEffect, useContext } from "react";
import "../../Style/OneAdvert.css";
import AutocompleteBan from "../Autocomplete/AutocompleteBan";
import { AuthContext, useAuthContext } from "../../Context/AuthProvider";

const htmlSpecialChars = require('htmlspecialchars');


function OneAdvert(props) {


    const advert_id = window.location.pathname.split('/')[2];
    const [data, setAdvert] = useState([]);

    const user = useContext(AuthContext);
    const { config } = useAuthContext();

    useEffect(() => {
        fetch(`https://${useAuthContext}/adverts/${advert_id}`)
            .then((res) => res.json())
            .then((data) => setAdvert(data));
    }, []);


    const [message, modifyMessage] = useState('');
    const [advert_title, modifyTitle] = useState('');
    const [advert_description, modifyDescription] = useState('');
    const advert_active = true;
    const advert_archive = false;
    const advert_favourite = 0;
    const advert_selected = false;
    const [category_id, modifyCategoryId] = useState(1);
    const [advert_address, modifyAdress] = useState('');
    const [advert_zip_code, modifyZipCode] = useState('');
    const [advert_city, modifyCity] = useState('');
    const [advert_department, modifyDepartment] = useState('');
    const [advert_latitude, modifyLatitude] = useState(0);
    const [advert_longitude, modifyLongitude] = useState(0);

    const token = localStorage.getItem('auth').replace(/"/g, '');
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`https://${useAuthContext}/adverts/${advert_id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    advert_title: htmlSpecialChars(advert_title),
                    advert_description: htmlSpecialChars(advert_description),
                    category_id: htmlSpecialChars(category_id),
                    advert_active: htmlSpecialChars(advert_active),
                    advert_archive: htmlSpecialChars(advert_archive),
                    advert_selected: htmlSpecialChars(advert_selected),
                    category_id: htmlSpecialChars(category_id),
                    advert_address: htmlSpecialChars(advert_address),
                    advert_zip_code: htmlSpecialChars(advert_zip_code),
                    advert_city: htmlSpecialChars(advert_city),
                    advert_department: htmlSpecialChars(advert_department),
                    advert_latitude: htmlSpecialChars(advert_latitude),
                    advert_longitude: htmlSpecialChars(advert_longitude),
                }),
            }).then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log("show me error that cannot be specify", err.message));

            if (res.status === 200) {
                modifyTitle(advert_title);
                modifyDescription(advert_description);
                modifyCategoryId(category_id);
                modifyAdress(advert_address);
                modifyZipCode(advert_zip_code);
                modifyCity(advert_city);
                modifyDepartment(advert_department);
                modifyLatitude(advert_latitude);
                modifyLongitude(advert_longitude);

                modifyMessage("User created successfully");
            } else {
                modifyMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [categories, setCategories] = useState([]);
    const getCategory = useEffect(() => {
        fetch(`https://${useAuthContext}/categories`)
            .then((res) => res.json())
            .then((categories) => setCategories(categories));
    }, []);

    const myCategories = categories.map(categories => {
        return <option value={categories.category_id}>{categories.category_type}</option>
    });

    return (
        <div className="OneAdvert">
            {/* Faire la page qui affiche l'annonce */}
            from: {user.userData.user_pseudo}, category: {data.category_type}, title: {data.advert_title}, description: {data.advert_description}, lieu de rdv:{data.advert_address} {data.advert_zip_code} {data.advert_city} {data.advert_department}
            <form onSubmit={handleSubmit}>
                <label>
                    Titre :
                    <input
                        type="text"
                        className="createAdvertText"
                        defaultValue={data.advert_title}
                        onChange={(event) => modifyTitle(event.target.value)}
                    />
                </label>
                <label>
                    Description :
                    <textarea
                        className="createAdvertText"
                        defaultValue={data.advert_description}
                        onChange={(event) => modifyDescription(event.target.value)}
                    />
                </label>
                <label>
                    Category :
                    <select name="category_id" id='selection' onChange={(event) => modifyCategoryId(Number(event.target.value))}>
                        <option disabled>--Please choose a category--</option>
                        {myCategories}
                    </select>
                    {/* <input type="text"
                        className="createAdvertText"
                        defaultValue={data.category_id}
                        onChange={(event) => modifyCategoryId(Number(event.target.value))}
                    /> */}
                </label>
                <AutocompleteBan value={data.advert_address}
                    onChange={(address) => { modifyAdress(address.properties.name); modifyCity(address.properties.city); modifyZipCode(address.properties.postcode); modifyDepartment(address.properties.context.split(',')[1]); modifyLatitude(address.geometry.coordinates[1]); modifyLongitude(address.geometry.coordinates[0]) }} />

                <button type="submit">Modifier l'annonce</button>
            </form>
        </div>
    );
}

export default OneAdvert