import React, { useState, useEffect, useContext } from "react";
import "../../Style/ModifyAdvert.css";
import AutocompleteBan from "../Autocomplete/AutocompleteBan";
import { AuthContext } from "../../Context/AuthProvider";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";

const htmlSpecialChars = require('htmlspecialchars');



function ModifyAdvert(props) {
    const advert_id = window.location.pathname.split('/')[2];
    const [data, setAdvert] = useState([]);

    const [errorEmptyTitle, setErrorEmptyTitle] = useState('');
    const [errorEmptyDescription, setErrorEmptyDescription] = useState('');
    const [errorEmptyCategory, setErrorEmptyCategory] = useState('');
    const [errorEmptyAddress, setErrorEmptyAddress] = useState('');

    const navigation = useNavigate();

    const user = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_MY_URL}/adverts/${advert_id}`)
            .then((res) => res.json())
            .then((data) => setAdvert(data));
    }, []);

    useEffect(() => {
        modifyTitle(data.advert_title)
        modifyDescription(data.advert_description)
        modifyCategoryId(data.category_id)
        modifyAdress(data.advert_address)
    }, [data]);

    const [message, modifyMessage] = useState('');
    const [advert_title, modifyTitle] = useState(data.advert_title);
    const [advert_description, modifyDescription] = useState(data.advert_description);
    const [category_id, modifyCategoryId] = useState(data.category_id);
    const [advert_address, modifyAdress] = useState(data.advert_address);
    const [advert_zip_code, modifyZipCode] = useState(data.advert_zip_code);
    const [advert_city, modifyCity] = useState(data.advert_city);
    const [advert_department, modifyDepartment] = useState(data.advert_department);
    const [advert_latitude, modifyLatitude] = useState(data.advert_latitude);
    const [advert_longitude, modifyLongitude] = useState(data.advert_longitude);

    const token = localStorage.getItem('auth').replace(/"/g, '');
    const value = useContext(AuthContext)
    console.log(value)
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`http://${process.env.REACT_APP_MY_URL}/adverts/${advert_id}`, {
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
                    category_id: htmlSpecialChars(category_id),
                    advert_address: htmlSpecialChars(advert_address),
                    advert_zip_code: htmlSpecialChars(advert_zip_code),
                    advert_city: htmlSpecialChars(advert_city),
                    advert_department: htmlSpecialChars(advert_department),
                    advert_latitude: htmlSpecialChars(advert_latitude),
                    advert_longitude: htmlSpecialChars(advert_longitude),
                }),
            })
                .then((data) => {
                    console.log(data)
                    console.log(advert_title)
                    console.log("tutu")

                    if (advert_title === "") {
                        setErrorEmptyTitle("Ce champ est obligatoire")
                    }
                    else if (advert_description === "") {
                        setErrorEmptyDescription("Ce champ est obligatoire")
                    }
                    else if (category_id === "") {
                        setErrorEmptyCategory("Ce champ est obligatoire")
                    }
                    else if (advert_address === "") {
                        setErrorEmptyAddress("Ce champ est obligatoire")
                    }
                    else {
                        modifyTitle(advert_title);
                        modifyDescription(advert_description);
                        modifyCategoryId(category_id);
                        modifyAdress(advert_address);
                        modifyZipCode(advert_zip_code);
                        modifyCity(advert_city);
                        modifyDepartment(advert_department);
                        modifyLatitude(advert_latitude);
                        modifyLongitude(advert_longitude);

                        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Votre annonce a été modifiée!</strong>,
                            html: <i></i>,
                            icon: 'success'
                        })
                        navigation('/Admin');

                    }
                    console.log(data)


                }).catch(err => console.log("show me error that cannot be specify", err));


        } catch (err) {
            console.log(err);
        }
    };

    const [categories, setCategories] = useState([]);
    const getCategory = useEffect(() => {
        fetch(`http://${process.env.REACT_APP_MY_URL}/categories`)
            .then((res) => res.json())
            .then((categories) => setCategories(categories));
    }, []);

    const myCategories = categories.map(categories => {
        if (categories.category_active) {
            return <option selected={data.category_id == categories.category_id ? true : false} value={categories.category_id}>{categories.category_type}</option>
        } else {
            return null
        }
    });

    
    return (
        <Container className="view border border-secondary rounded shadow-sm mb-5">
            <Row className="d-flex justify-content-center">
            {value.userData[0].role_type == 'user' ? (
                    <a href="/MyAdverts" className="d-flex justify-content-start">Retour</a>) : (
                    null)
                }
                {value.userData[0].role_type == 'modérateur' || value.userData[0].role_type == 'admin' || value.userData[0].role_type == 'super_admin' ? (
                    <a href="/AdvertList" className="d-flex justify-content-start">Retour</a>) : (
                    null)
                }
                <h3 className="text-center">Modification d'une annonce</h3>
                <Col className="col-lg-8 col-12 mb-3">

                    {/* Faire la page qui affiche l'annonce */}

                    <form
                        className="pt-5"
                        onSubmit={handleSubmit}>
                        <div className="d-flex flex-column">

                            <label className="fw-bold">Titre : </label>
                            <input
                                className="form-control mb-3"
                                type="text"
                                value={advert_title}
                                onChange={(event) => {
                                    modifyTitle(event.target.value.trim())
                                }}
                            />
                        </div>
                        <p className="message">{advert_title == "" ? errorEmptyTitle : ""}</p>
                        <div className="d-flex flex-column">
                            <label className="fw-bold">Description : </label>
                            <textarea
                                className="form-control mb-3"
                                value={advert_description}
                                onChange={(event) => modifyDescription(event.target.value.trim())}
                            />
                            <p className="message">{advert_description == "" ? errorEmptyDescription : ""}</p>
                        </div>
                        <div className="d-flex flex-column">
                            <label className="fw-bold">Categorie :</label>
                            <select
                                className="form-control mb-3"
                                name="category_id"
                                id='selection'
                                onChange={(event) => modifyCategoryId(Number(event.target.value.trim()))}>
                                <option disabled>--Please choose a category--</option>
                                {myCategories}
                            </select>
                            <p className="message">{category_id == "" ? errorEmptyCategory : ""}</p>
                        </div>


                        <AutocompleteBan
                            value={advert_address}
                            onChange={(address) => { modifyAdress(address.properties.name); modifyCity(address.properties.city); modifyZipCode(address.properties.postcode); modifyDepartment(address.properties.context.split(',')[1]); modifyLatitude(address.geometry.coordinates[1]); modifyLongitude(address.geometry.coordinates[0]) }} />
                        <p className="message">{advert_address == "" ? errorEmptyAddress : ""}</p>
                        <Button type="submit">Modifier l'annonce</Button>
                    </form>

                </Col>
            </Row>
        </Container>
    );
}

export default ModifyAdvert