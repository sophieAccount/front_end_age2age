import React, { useState, useContext, useReducer } from "react";
// import "../../Style/Profile.css";
import AutocompleteBan from "../Autocomplete/AutocompleteBan";
import { AuthContext, useAuthContext } from "../../Context/AuthProvider";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Profile() {

    const { setToken, setUserData } = useAuthContext();
    const token = localStorage.getItem('auth').replace(/"/g, '');
    const userId = localStorage.getItem('userId').replace(/"/g, '');
    const htmlspechialchars = require('htmlspecialchars');

    const navigation = useNavigate();

    const user = useContext(AuthContext);
    let userData = user.userData[0] ? user.userData[0] : '';

    const [firstName, setFirstName] = useState(userData.user_firstname);
    const [lastName, setLastName] = useState(userData.user_lastName);
    const [phoneNumber, setPhoneNumber] = useState(userData.user_phone_number);
    const [emailAddress, setEmailAddress] = useState(userData.user_email_address);
    const [avatar, setAvatar] = useState('https://via.placeholder.com/150x150.png?text=Avatar');
    const [pseudo, setPseudo] = useState(userData.user_pseudo);
    const [address, setAdress] = useState(userData.user_address);
    const [zip_code, setZipCode] = useState("");
    const [city, setCity] = useState(userData.user_city);
    const [department, setDepartment] = useState(userData.user_department);
    const [latitude, setLatitude] = useState(userData.user_latitude);
    const [longitude, setLongitude] = useState(userData.user_longitude);

    const [mailUnavailable, setMailUnavailable] = useState("");
    const [pseudoUnavailable, setPseudoUnavailable] = useState("");
    const [phoneUnavailable, setPhoneUnavailable] = useState("");
    const [errorEmpty, setErrorEmpty] = useState('');
    const [wrongPassword, setWrongPassword] = useState('');
    const [wrongMail, setWrongMail] = useState('');
    const [wrongPhoneNumber, setWrongPhoneNumber] = useState('');

    const [ignored, fctMiseAJour] = useReducer(x => x + 1, 0);


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`http://${process.env.REACT_APP_MY_URL}/users/${userData.user_id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user_firstname: htmlspechialchars(firstName),
                    user_lastName: htmlspechialchars(lastName),
                    user_phone_number: htmlspechialchars(phoneNumber),
                    user_email_address: htmlspechialchars(emailAddress),
                    user_pseudo: htmlspechialchars(pseudo),
                    user_address: htmlspechialchars(address),
                    user_city: htmlspechialchars(city),
                    user_zip_code: htmlspechialchars(zip_code),
                    user_department: htmlspechialchars(department),
                    user_longitude: htmlspechialchars(longitude),
                    user_latitude: htmlspechialchars(latitude),
                }),
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (firstName == "") {
                        setErrorEmpty("ce champ est obligatoire")
                    }
                    else if (lastName == "") {
                        setErrorEmpty("ce champ est obligatoire")
                    }
                    else if (phoneNumber == "") {
                        setErrorEmpty("ce champ est obligatoire")
                    }
                    else if (emailAddress == "") {
                        setErrorEmpty("ce champ est obligatoire")
                    }
                    else if (pseudo == "") {
                        setErrorEmpty("ce champ est obligatoire")
                    }
                    else if (address == "") {
                        setErrorEmpty("ce champ est obligatoire")
                    }
                    else if (data.message && data.message.includes(`this email address`) && data.message.includes(`already taken`)) {
                        setMailUnavailable("cette adresse mail est déjà utilisée")
                    }
                    else if (data.message && data.message.includes('this username') && data.message.includes(`already taken`)) {
                        setPseudoUnavailable("ce pseudo est déjà utilisée")
                    }
                    else if (data.message && data.message.includes('this phone') && data.message.includes(`already taken`)) {
                        setPhoneUnavailable("ce numéro de téléphone est déjà utilisée")
                    }
                    else if (data.message && data.message.includes('this email address is invalid')) {
                        setWrongMail("Ce mail est invalide")
                    }
                    else if (data.message && data.message.includes('this phone number address is invalid')) {
                        setWrongPhoneNumber("Ce numéro de téléphone est invalide")
                    } else {


                        setFirstName(firstName);
                        setLastName(lastName);
                        setPhoneNumber(phoneNumber);
                        setEmailAddress(emailAddress);
                        setPseudo(pseudo);
                        setAdress(address);
                        setZipCode(zip_code);
                        setCity(city);
                        setDepartment(department);
                        setLatitude(latitude);
                        setLongitude(longitude);

                        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Votre profil a été modifié!</strong>,
                            html: <i></i>,
                            icon: 'success'
                        })
                        navigation('/Admin');
                    }
                })
                .catch(err => console.log("show me error that cannot be specify", err));
        } catch (err) {
            console.log(err);
        }
    };

    console.log(localStorage.getItem('auth').replace('""', ''))
    return (
        <Container className="view border border-secondary shadow-sm mb-5 rounded">

            <a href="/Admin" className="d-flex justify-content-start">Retour</a>
            <h1>Votre profile</h1>
            {/* <div className="avatar-container">
                <img src={avatar} alt="Avatar" />
                <div class="parent-div">
                    <button class="btn-upload">Choisir le fichier</button>
                    <input type="file" name="upfile" accept="image/*" />
                </div>
            </div> */}
            <Row className="d-flex justify-content-center mx-auto">
                <form
                    className="mb-5"
                    onSubmit={handleSubmit}>
                    <Col className="col-lg-12 col-12">
                        <div className="d-flex flex-column ">
                            <label>Prénom :  </label>
                            <input
                                type="text"
                                className="profileText form-control"
                                value={firstName} onChange={(event) => { setFirstName(event.target.value.trim()) }} />
                            <p className="message">{firstName == "" ? errorEmpty : ""}</p>

                        </div>
                        <div className="d-flex flex-column mt-3">
                            <label>Nom de famille : </label>
                            <input type="text" className="profileText" defaultValue={userData.user_lastname} onChange={(event) => setLastName(event.target.value.trim())} />
                            <p className="message">{lastName == "" ? errorEmpty : ""}</p>

                        </div>
                        <div className="d-flex flex-column mt-3">
                            <label>Pseudo :</label>
                            <input type="text" className="profileText" defaultValue={userData.user_pseudo} onChange={(event) => { setPseudoUnavailable("".trim()); setPseudo(event.target.value.trim()) }} />
                            <p className="message">{pseudo == "" ? errorEmpty : ""}</p>
                            <p className="message">{pseudoUnavailable}</p>

                        </div>
                        <div className="d-flex flex-column mt-3">
                            <label>Numéro de téléphone : </label>
                            <input type="text" className="profileText" defaultValue={userData.user_phone_number} onChange={(event) => { setWrongPhoneNumber("".trim()); setPhoneUnavailable("".trim()); setPhoneNumber(event.target.value.trim()) }} />
                            <p className="message">{phoneNumber == "" ? errorEmpty : ""}</p>
                            <p className="message">{phoneUnavailable}</p>
                            <p className="message">{wrongPhoneNumber}</p>
                        </div>
                        <div className="d-flex flex-column mt-3">
                            <label>Adresse e-mail :   </label>
                            <input type="text" className="profileText" defaultValue={userData.user_email_address} onChange={(event) => { setWrongMail("".trim()); setMailUnavailable("".trim()); setEmailAddress(event.target.value.trim()) }} />
                            <p className="message">{emailAddress == "" ? errorEmpty : ""}</p>
                            <p className="message">{mailUnavailable}</p>
                            <p className="message">{wrongMail}</p>
                        </div>

                        <div className="d-flex flex-column mt-3">
                            <label>Adresse :     </label>
                            <AutocompleteBan value={userData.user_address}
                                onChange={(address) => { setAdress(address.properties.name); setCity(address.properties.city); setZipCode(address.properties.postcode); setDepartment(address.properties.context.split(',')[1]); setLatitude(address.geometry.coordinates[1].toString()); setLongitude(address.geometry.coordinates[0].toString()) }} />
                            <p className="message">{address == "" ? errorEmpty : ""}</p>

                        </div>
                        <Button type="submit">Enregistrer les modifications</Button>

                    </Col>
                </form>
            </Row>
        </Container>
    );
}

export default Profile;
