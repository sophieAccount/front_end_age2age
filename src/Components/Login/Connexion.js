import React, { useState } from "react";
import { useAuthContext } from "../../Context/AuthProvider";
import "../../Style/Connexion.css";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const htmlspecialchars = require('htmlspecialchars');

function Connexion() {
    const { setToken, setUserId } = useAuthContext();

    const setRole = useState("");
    const [user_email_address, setMail] = useState("");
    const [user_password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [errorEmpty, setErrorEmpty] = useState("");

    const navigation = useNavigate();
    const { config } = useAuthContext();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`https://${useAuthContext}/users/authenticate`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // withCredentials: true
                },
                body: JSON.stringify({
                    user_email_address: htmlspecialchars(user_email_address),
                    user_password: htmlspecialchars(user_password),
                })
            }).then(res => res.json())
                .then((user) => {
                    if (user.message && user.message.includes('user_password is incorrect')) {
                        setError("L'adresse mail ou le mot de passe est incorrect")
                    }
                    if (user.message && user.message.includes('is not allowed to be empty')) {
                        setErrorEmpty("Veuillez remplir tous les champs")
                    }
                    if (!user.message) {
                        console.log("toto", user);

                        const accessToken = localStorage.setItem("auth", JSON.stringify(user.token));
                        const userId = localStorage.setItem("userId", JSON.stringify(user.user_id));
                        setUserId({ userId });
                        setToken({ accessToken });
                        setMail(user_email_address);
                        setPassword(user_password);
                        navigation('/');

                        window.location.reload();

                        console.log("user connected")
                    }

                })
        } catch (err) { console.log("show me error that cannot be specify", err) };
        //     if (!JSON.stringify(response.message)) {
        //         console.log("toto", response);
        //         console.log("response", JSON.stringify(response.message));

        //         console.log("toto", JSON.stringify(response.token));
        //         const accessToken = localStorage.setItem("auth", JSON.stringify(response.token));
        //         const userId = localStorage.setItem("userId", JSON.stringify(response.user_id));
        //         setUserId({ userId });
        //         setToken({ accessToken });
        //         setMail(user_email_address);
        //         setPassword(user_password);
        //         navigation('/');

        //         window.location.reload();

        //         console.log("user connected")
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    }

    return (
        <>
            <Container className="view border border-secondary shadow-sm rounded">
                <h2 className="text-center mt-5">Connexion</h2>
                <Row className="d-flex justify-content-center">
                    <Col className="col-lg-8 col-12">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <p className="message">{error}</p>
                                <p className="message">{errorEmpty}</p>
                                <label htmlFor="User">Adresse email</label>
                                <input
                                    type="text"
                                    value={user_email_address}
                                    onChange={(event) => { setErrorEmpty(""); setMail(event.target.value) }}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Mot de passe</label>
                                <input
                                    type="password"
                                    value={user_password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Se connecter</button>
                        </form>
                    </Col>
                </Row>
            </Container>

        </>
    );
}
export default Connexion;