import React, { useState, useEffect, useContext } from "react";
import "../../Style/CreateAdvert.css";
import AutocompleteBan from "../Autocomplete/AutocompleteBan";
import { AuthContext, useAuthContext } from "../../Context/AuthProvider";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const htmlspecialchars = require('htmlspecialchars');

function CreateAdvert(props) {

    const [message, setMessage] = useState('');
    const [advert_title, setTitle] = useState('');
    const [advert_description, setDescription] = useState('');
    const [advert_active, setAdvert] = useState(false);
    const advert_archive = false;
    const advert_selected = false;
    const [category_id, setCategoryId] = useState("");
    const [advert_address, setAdress] = useState('');
    const [advert_zip_code, setZipCode] = useState('');
    const [advert_city, setCity] = useState('');
    const [advert_department, setDepartment] = useState('');
    const [advert_latitude, setLatitude] = useState("0");
    const [advert_longitude, setLongitude] = useState("0");
    const [user_id_create, setUserIdCreate] = useState("");
    const navigation = useNavigate();

    const [errorEmpty, setErrorEmpty] = useState("");

    const user = useContext(AuthContext);
    const token = localStorage.getItem('auth').replace(/"/g, '');

    let handleSubmit = async (e) => {
        e.preventDefault();
        var status = 0;
        try {
            let res = await fetch(`http://${process.env.REACT_APP_MY_URL}/adverts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    advert_title: htmlspecialchars(advert_title),
                    advert_description: htmlspecialchars(advert_description),
                    advert_active: htmlspecialchars(advert_active).toString(),
                    advert_archive: htmlspecialchars(advert_archive).toString(),
                    advert_selected: htmlspecialchars(advert_selected).toString(),
                    category_id: htmlspecialchars(category_id),
                    advert_address: htmlspecialchars(advert_address),
                    advert_zip_code: htmlspecialchars(advert_zip_code),
                    advert_city: htmlspecialchars(advert_city),
                    created: new Date(),
                    advert_department: htmlspecialchars(advert_department),
                    advert_latitude: htmlspecialchars(advert_latitude).toString(),
                    advert_longitude: htmlspecialchars(advert_longitude).toString(),
                    user_id_create: htmlspecialchars(user.userData[0].user_id).toString(),

                }),
            }).then(res => res.json())
                .then((data) => {
                    console.log(data.message)
                    if (data.message && data.message.includes('is not allowed to be empty')) {
                        setErrorEmpty("Ce champ est obligatoire")
                    }
                    if (!data.message) {
                        setTitle(advert_title);
                        setDescription(advert_description);
                        setAdvert(1);
                        setAdress(advert_address);
                        setZipCode(advert_zip_code);
                        setCity(advert_city);
                        setDepartment(advert_department);
                        setLatitude(advert_latitude);
                        setLongitude(advert_longitude);
                        setUserIdCreate(user.userData[0].user_id);
                        console.log("user id create", user_id_create);

                        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Votre annonce a été créée!</strong>,
                            html: <i></i>,
                            icon: 'success'
                        })
                        navigation('/Admin');
                        setMessage("User created successfully");

                    }


                })
                .catch(err => console.log("show me error that cannot be specify", err));


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
            return <option value={categories.category_id}>{categories.category_type}</option>
        } else {
            return null
        }
    });

    return (
        <Container className="view border border-secondart rounded shadow-sm mb-5">
            <Row className="d-flex justify-content-center">
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>
                <h3 className="text-center">Créer une nouvelle annonce</h3>
                <Col className="col-lg-8 col-12">
                    <form className="view" onSubmit={handleSubmit}>
                        <div className="d-flex flex-column mb-3">
                            <label className="fw-bold">Titre : </label>
                            <input
                                type="text"
                                className="createAdvertText form-control"
                                value={advert_title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                            <p className="message">{advert_title == "" ? errorEmpty : ""}</p>


                        </div>
                        <div className="d-flex flex-column mb-3">
                            <label>Description : </label>
                            <textarea
                                className="createAdvertText form-control"
                                value={advert_description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <p className="message">{advert_description == "" ? errorEmpty : ""}</p>

                        </div>
                        <div className="d-flex flex-column mb-3">
                            <label className="pb-3">Categorie : </label>
                            <select
                                className="text-center form-control"
                                name="category_id"
                                id='selection'
                                onChange={(event) => setCategoryId(Number(event.target.value))}>
                                <option selected disabled>--Merci de choisir une catégorie--</option>
                                {myCategories}
                            </select>
                            <p className="message">{category_id == "" ? errorEmpty : ""}</p>


                        </div>
                        <AutocompleteBan value={advert_address}
                            onChange={(address) => { setAdress(address.properties.name); setCity(address.properties.city); setZipCode(address.properties.postcode); setDepartment(address.properties.context.split(',')[1]); setLatitude(address.geometry.coordinates[1]); setLongitude(address.geometry.coordinates[0]) }} />
                        <p className="message">{advert_address == "" ? errorEmpty : ""}</p>


                        <Button type="submit">Créer une annonce</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateAdvert;