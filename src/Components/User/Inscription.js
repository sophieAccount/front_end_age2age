import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from "joi";
import "../../Style/CreateAdvert.css";
import AutocompleteBan from "../Autocomplete/AutocompleteBan";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuthContext } from "../../Context/AuthProvider";


function Inscription(event) {


    const user_active = true;
    const role_id = 6;


    const [user_firstname, setFirstName] = useState('');
    const [user_lastname, setLastname] = useState('');
    const [user_phone_number, setPhoneNumber] = useState('');
    const [user_email_address, setEmailAddress] = useState('');
    const [user_pseudo, setPseudo] = useState('');
    const [user_password, setPassword] = useState('');
    const [user_confirm_password, setConfirmPassword] = useState('');
    const [user_address, setAdress] = useState('');
    const [user_zip_code, setZipCode] = useState('');
    const [user_city, setCity] = useState('');
    const [user_department, setDepartment] = useState('');
    const [user_latitude, setLatitude] = useState("0");
    const [user_longitude, setLongitude] = useState("0");


    const [mailUnavailable, setMailUnavailable] = useState("");
    const [pseudoUnavailable, setPseudoUnavailable] = useState("");
    const [phoneUnavailable, setPhoneUnavailable] = useState("");
    const [errorEmpty, setErrorEmpty] = useState('');
    const [wrongPassword, setWrongPassword] = useState('');
    const [wrongMail, setWrongMail] = useState('');
    const [wrongPhoneNumber, setWrongPhoneNumber] = useState('');

    const navigation = useNavigate();
    const htmlspecialchars = require('htmlspecialchars');
    const { config } = useAuthContext();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`https://${config}/users/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    user_firstname: htmlspecialchars(user_firstname),
                    user_lastname: htmlspecialchars(user_lastname),
                    user_phone_number: htmlspecialchars(user_phone_number),
                    user_email_address: htmlspecialchars(user_email_address),
                    user_password: htmlspecialchars(user_password),
                    user_pseudo: htmlspecialchars(user_pseudo),
                    user_active: htmlspecialchars(user_active),
                    user_address: htmlspecialchars(user_address),
                    user_zip_code: htmlspecialchars(user_zip_code),
                    user_city: htmlspecialchars(user_city),
                    user_department: htmlspecialchars(user_department),
                    user_latitude: htmlspecialchars(user_latitude.toString()),
                    user_longitude: htmlspecialchars(user_longitude.toString()),
                    role_id: htmlspecialchars(role_id)
                }),
            }).then((resp) => resp.json()).then((user) => {
                console.log("User created success", user.message);
                console.log("User created success", user);
                if (user.message.includes('is not allowed to be empty')) {
                    setErrorEmpty("ce champ est obligatoire")
                }
                if (user.message.includes('this email address') && user.message.includes(`already taken`)) {
                    setMailUnavailable("cette adresse mail est déjà utilisée")
                }
                if (user.message.includes('this username') && user.message.includes(`already taken`)) {
                    setPseudoUnavailable("ce pseudo est déjà utilisée")
                }
                if (user.message.includes('this phone') && user.message.includes(`already taken`)) {
                    setPhoneUnavailable("ce numéro de téléphone est déjà utilisée")
                }
                if (user_password !== user_confirm_password) {
                    setWrongPassword("les mots de passe ne correspondent pas")
                }
                if (user.message.includes('this email address is invalid')) {
                    setWrongMail("Ce mail est invalide")
                }
                if (user.message.includes('this phone number address is invalid')) {
                    setWrongPhoneNumber("Ce numéro de téléphone est invalide")
                }
                if (user.message.includes('Registration successful')) {
                    const MySwal = withReactContent(Swal)

                    MySwal.fire({
                        title: <strong>Vous êtes bien inscrit!</strong>,
                        html: <i></i>,
                        icon: 'success'
                    })

                    navigation('../Connexion');
                }

            }).catch(err => console.log("show me error that cannot be specify", err));

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <Container className="border border-secondary rounded shadow-sm">
            <h2 className="text-center mt-5">INSCRIVEZ-VOUS</h2>
            <Row className="d-flex justify-content-center">
                <Col className="col-lg-8 col-12">
                    <form
                        className="mb-3"
                        onSubmit={handleSubmit}>
                        <div className="d-flex flex-column">
                            <label>Prenom* : </label>
                            <input
                                className="createAdvertText form-control"
                                onChange={(event) => { setErrorEmpty(""); setFirstName(event.target.value); }} />
                            <p className="message">{user_firstname == "" ? errorEmpty : ""}</p>
                        </div>
                        <div className="d-flex flex-column ">
                            <label>Nom* : </label>
                            <input
                                className="createAdvertText form-control"
                                onChange={(event) => { setErrorEmpty(""); setLastname(event.target.value); }} />
                            <p className="message">{user_lastname == "" ? errorEmpty : ""}</p>
                        </div>

                        <div className="d-flex flex-column ">
                            <label>Numero de téléphone* : </label>
                            <input
                                className="createAdvertText form-control"
                                onChange={(event) => { setErrorEmpty(""); setWrongPhoneNumber(""); setPhoneUnavailable(""); setPhoneNumber(event.target.value); }}
                            />
                            <p className="message">{user_phone_number == "" ? errorEmpty : ""}</p>
                            <p className="message">{phoneUnavailable}</p>
                            <p className="message">{wrongPhoneNumber}</p>
                        </div>

                        <div className="d-flex flex-column ">
                            <label>Adresse mail* :  </label>
                            <input
                                className="form-control"
                                onChange={(event) => { setErrorEmpty(""); setWrongMail(""); setMailUnavailable(""); setEmailAddress(event.target.value); }}
                            />
                            <p className="message">{user_email_address == "" ? errorEmpty : ""}</p>
                            <p className="message">{mailUnavailable}</p>
                            <p className="message">{wrongMail}</p>
                        </div>
                        <div className="d-flex flex-column ">
                            <label>Pseudo* :   </label>
                            <input
                                className="createAdvertText form-control"
                                onChange={(event) => { setErrorEmpty(""); setPseudoUnavailable(""); setPseudo(event.target.value); }}
                            />

                            <p className="message">{user_pseudo == "" ? errorEmpty : ""}</p>
                            <p className="message">{pseudoUnavailable}</p>
                        </div>
                        <div className="d-flex flex-column ">
                            <label>Adresse* :</label>
                            <AutocompleteBan className="createAdvertText form-control" value={user_address}
                                onChange={(address) => { setErrorEmpty(""); setAdress(address.properties.name); setCity(address.properties.city); setZipCode(address.properties.postcode); setDepartment(address.properties.context.split(',')[1]); setLatitude(address.geometry.coordinates[1]); setLongitude(address.geometry.coordinates[0]) }}
                            />

                            <p className="message">{user_address == "" ? errorEmpty : ""}</p>
                        </div>
                        <div className="d-flex flex-column ">
                            <label>Mot de passe* :    </label>
                            <input className="createAdvertText form-control" type="password" onChange={(event) => { setErrorEmpty(""); setPassword(event.target.value); }} />

                            <p className="message">{user_password == "" ? errorEmpty : ""}</p>
                        </div>
                        <div className="d-flex flex-column ">
                            <label>Confirmer mot de passe* :  </label>
                            <input className="createAdvertText form-control" type="password" onChange={(event) => { setWrongPassword(""); setErrorEmpty(""); setConfirmPassword(event.target.value); }} />


                            <p className="message">{user_confirm_password == "" ? errorEmpty : ""}</p>
                            <p className="message">{wrongPassword}</p>
                        </div>
                        <Button type="submit">S'inscrire</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}

export default Inscription;