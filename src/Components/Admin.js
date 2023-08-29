import React, { useState, useEffect } from "react";
import "../Style/Admin.css";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../Context/AuthProvider";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Admin(props) {

    const user = useAuthContext();
    const { config } = useAuthContext();
    const [activeTab, setActiveTab] = useState("users");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [comment, setCommentCount] = useState([]);
    const [advert, setAdvertCount] = useState([]);


    useEffect(() => {
        fetch(`https://${config}/comments/comment/validate`)
            .then((res) => res.json())
            .then((comment) => setCommentCount(comment));
    }, []);

    useEffect(() => {
        fetch(`https://${config}/adverts/advert/validate`)
            .then((res) => res.json())
            .then((data) => setAdvertCount(data));
    }, []);

    const commentCount = comment ? comment[0] : 'pas de donnée'
    const advertCount = advert ? advert[0] : 'pas de donnée'

    console.log(commentCount)
    console.log(advertCount)


    return (
        <Container className=" Admin  mb-5">
            <h1 className="age2age">Bienvenue {user.userData[0].user_pseudo}<br/> { user.userData[0].role_type !== 'user' ? (<span class="badge rounded-pill bg-danger" id={user.userData[0].role_type}> {user.userData[0].role_type}</span>) : (null)}</h1>
            <Row className="d-flex justify-content-center adminCategories">
                <Col className="categorie categorieAdvert col-lg-6 col-12">
                    <div className="firstElement element">
                        Annonces
                    </div>
                    {user.userData[0].role_type == 'admin' || user.userData[0].role_type == 'super_admin' ? (
                        <>
                            <Link to="/AdvertList">
                                <div className="element">
                                    Toutes les annonces
                                </div>
                            </Link>
                            <Link to="/AdvertValidate">
                                <div className="element">
                                    Valider les annonces
                                    <span class="ms-2 badge rounded-pill bg-danger"> {advertCount ? advertCount.countadverts : null}</span>


                                </div>
                            </Link>
                        </>
                    ) : (
                        <Link to="/MyAdverts">
                            <div className="element">
                                Mes annonces
                            </div>
                        </Link>
                    )
                    }
                    {user.userData[0].role_type == 'modérateur' ? (
                        <>
                            <Link to="/AdvertList">
                                <div className="element">
                                    Toutes les annonces
                                </div>
                            </Link>
                            <Link to="/AdvertValidate">
                                <div className="element">
                                    Valider les annonces
                                    <span class="ms-2 badge rounded-pill bg-danger"> {advertCount ? advertCount.countadverts : null}</span>

                                </div>
                            </Link>
                        </>

                    ) : (
                        null
                    )
                    }


                    <Link to="/CreateAdvert">
                        <div className="element">
                            Créer une annonce
                        </div>
                    </Link>
                </Col >

                <Col className="categorie categorieComment  col-lg-6 col-12">
                    <div className="firstElement element ">
                        Commentaires
                    </div>
                    {user.userData[0].role_type == 'admin' || user.userData[0].role_type == 'super_admin' ? (
                        <>
                            <Link to="/comments">
                                <div className="element">
                                    Tous les commentaires
                                </div>
                            </Link>
                            <Link to="/validateComment">
                                <div className="element">
                                    Valider les commentaires
                                    <span class="ms-2 badge rounded-pill bg-danger"> {commentCount ? commentCount.countcomments : null}</span>
                                </div>
                            </Link>
                        </>

                    ) : (

                        <Link to="/MyComments">
                            <div className="element">
                                Mes commentaires
                            </div>
                        </Link>
                    )}
                    <Link to="/AddComment">
                        <div className="element">
                            Ajouter un commentaire
                        </div>
                    </Link>
                    {user.userData[0].role_type == 'modérateur' ? (
                        <>
                            <Link to="/comments">
                                <div className="element">
                                    Tous les commentaires
                                </div>
                            </Link>
                            <Link to="/validateComment">
                                <div className="element">

                                    Valider les commentaires
                                    <span class="ms-2 badge rounded-pill bg-danger"> {commentCount ? commentCount.countcomments : null}</span>
                                </div>

                            </Link>
                        </>


                    ) : (
                        null
                    )
                    }
                </Col>

                {user.userData[0].role_type == 'admin' || user.userData[0].role_type == 'super_admin' ? (
                    <Col className="categorie categorieCategorie  col-lg-6 col-12">
                        <div className="firstElement element">
                            Catégories
                        </div>
                        <Link to="/categories">
                            <div className="element">
                                Toutes les catégories
                            </div>
                        </Link>
                        <Link to="/AddCategory">
                            <div className="element">
                                Ajouter une catégorie
                            </div>
                        </Link>
                    </Col>
                ) : (null)}

                {user.userData[0].role_type == 'admin' || user.userData[0].role_type == 'super_admin' ? (
                    <Col className="categorie categorieUser  col-lg-6 col-12">
                        <div className="firstElement element">
                            Utilisateurs
                        </div>
                        <Link to="/UsersList">
                            <div className="element">
                                Tous les utilisateurs
                            </div>
                        </Link>
                        <Link to="/MyProfile">
                            <div className="element">
                                Mon profil
                            </div>
                        </Link>
                    </Col>

                ) : (
                    null
                )}

                {user.userData[0].role_type == 'modérateur' || user.userData[0].role_type == 'user' ? (
                    <Col className="categorie categorieUser  col-lg-6 col-12">
                        <div className="firstElement element">
                            Utilisateurs
                        </div>

                        <Link to="/MyProfile">
                            <div className="element">
                                Mon profil
                            </div>
                        </Link>
                    </Col>

                ) : (
                    null
                )}



                {user.userData[0].role_type == 'admin' || user.userData[0].role_type == 'super_admin' ? (
                    <Col className="categorie categorieUser  col-lg-6 col-12">
                        <div className="firstElement element">
                            Messages
                        </div>
                        <Link to="/Messages">
                            <div className="element">
                                Tous les messages
                            </div>
                        </Link>
                        <Link to="/AddMessage">
                            <div className="element">
                                Ajouter un message
                            </div>
                        </Link>
                    </Col>
                ) : (
                    <Col className="categorie categorieUser  col-lg-6 col-12">
                        <div className="firstElement element">
                            Messages
                        </div>
                        <Link to="/MyMessages">
                            <div className="element">
                                Mes messages
                            </div>
                        </Link> <Link to="/AddMessage">
                            <div className="element">
                                Ecrire un message
                            </div>
                        </Link>
                    </Col>
                )}


                {user.userData[0].role_type == 'super_admin' ? (
                    <Col className="categorie categorieUser  col-lg-6 col-12">
                        <div className="firstElement element">
                            Rôles
                        </div>

                        <Link to="/Roles">
                            <div className="element">
                                Tous les rôles
                            </div>
                        </Link>
                        <Link to="/AddRole">
                            <div className="element">
                                Ajouter un rôle
                            </div>
                        </Link>

                    </Col>
                ) : (
                    null
                )}

            </Row>
        </Container>
    )

}

export default Admin