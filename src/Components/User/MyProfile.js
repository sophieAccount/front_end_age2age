import React, { Component } from "react";
import UserService from "../../Service/UserService";
import { withRouter } from '../../Common/with-router';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MyProfile extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.getUser = this.getUser.bind(this);
        this.getFav = this.getFav.bind(this);
        this.getRating = this.getRating.bind(this);
        this.getSelect = this.getSelect.bind(this);
        this.getAdvertCreatedByUser = this.getAdvertCreatedByUser.bind(this);
        this.getCommentUserReceived = this.getCommentUserReceived.bind(this);
        this.getCommentUserSend = this.getCommentUserSend.bind(this);


        this.state = {
            oneUser: {
                user_id: null,
                user_active: false,
            },
            message: "",
            userFav: { user_id: null },
            advertCreated: { user_id: null },
            advertSelected: { user_id: null },
            userRating: { user_id: null },
            commentSend: [],
            commentReceive: [],
            roles: [],
        };
    }

    componentDidMount() {
        this.getUser(this.context.userData[0].user_id);
        this.getFav(this.context.userData[0].user_id);
        this.getRating(this.context.userData[0].user_id);
        this.getSelect(this.context.userData[0].user_id);
        this.getAdvertCreatedByUser(this.context.userData[0].user_id);
        this.getCommentUserSend(this.context.userData[0].user_id);
        this.getCommentUserReceived(this.context.userData[0].user_id)
    }

    getUser(id) {
        UserService.get(id)
            .then(response => {
                this.setState({
                    oneUser: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    getCommentUserSend(id) {
        UserService.getCommentUserSend(id)
            .then(response => {
                this.setState({
                    commentSend: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    getCommentUserReceived(id) {
        UserService.getCommentUserReceived(id)
            .then(response => {
                this.setState({
                    commentReceive: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    getFav(id) {
        UserService.getUserFavourite(id)
            .then(response => {
                this.setState({
                    userFav: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    getSelect(id) {
        UserService.getAdvertsSelectedByUser(id)
            .then(response => {
                this.setState({
                    advertSelected: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    getAdvertCreatedByUser(id) {
        UserService.getAdvertCreatedByUser(id)
            .then(response => {
                this.setState({
                    advertCreated: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    getRating(id) {
        UserService.getAverageRatingUser(id)
            .then(response => {
                this.setState({
                    userRating: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        const { oneUser, userFav, advertCreated, advertSelected, userRating, commentReceive, commentSend, roles } = this.state;
        const value = this.context

        return (
            <Container className="view border border-secondary shadow-sm rounded pb-3 mb-5">
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>

                {oneUser[0] ? (
                    <Row className="d-flex justify-content-center">
                        <Col className="col-lg-6 col-12">
                            <h4 className="p-5 text-center">{oneUser[0].user_firstname} {oneUser[0].user_lastname}</h4>

                        </Col>
                    </Row>

                ) : (null)}
                <Row className="d-flex justify-content-center">
                    {oneUser[0] ? (
                        <Col className="col-lg-5 col-12 p-3">

                            <p className="d-flex justify-content-start  p-1">Pseudo : {oneUser[0].user_pseudo}</p>
                            <p className="d-flex justify-content-start  p-1">Adresse : {oneUser[0].user_address}</p>
                            <p className="d-flex justify-content-start  p-1">Code postal : {oneUser[0].user_zip_code}</p>
                            <p className="d-flex justify-content-start  p-1">Ville : {oneUser[0].user_city}</p>
                            <p className="d-flex justify-content-start  p-1">Numéro de téléphone : {oneUser[0].user_phone_number}</p>
                            <p className="d-flex justify-content-start  p-1">Statut : {oneUser[0].user_active ? "actif" : "non actif"}</p>
                            <p className="d-flex justify-content-start  p-1">Rôle : {oneUser[0].role_type}  </p>


                            <p>{this.state.message}</p>
                        </Col>
                    ) : (
                        null
                    )}

                    <Col className="col-lg-5 col-12  mx-auto">
                        <Link
                            to={"/Profile"}
                            className="badge badge-warning mb-3"
                        >
                            <Button>Modifier </Button>
                        </Link>
                        {userFav[0] ? (
                            <p className="d-flex justify-content-start  p-1">Annonces favorites : {userFav[0].FavouriteAdvert} </p>
                        ) :
                            (
                                <p className="d-flex justify-content-start  p-1">Aucune annonce mise en fav</p>
                            )}
                        {advertCreated[0] ? (
                            <p className="d-flex justify-content-start  p-1">Annonces créées : {advertCreated[0].created}</p>
                        ) : (
                            <p className="d-flex justify-content-start  p-1">Aucune annonce créé</p>
                        )}
                        {advertSelected[0] ? (
                            <p className="d-flex justify-content-start  p-1">Annonces selectionnées : {advertSelected[0].selected}</p>
                        ) : (
                            <p className="d-flex justify-content-start  p-1">Aucune annonce selectionnée</p>
                        )}
                        {userRating[0] ? (
                            <p className="d-flex justify-content-start  p-1">Note moyenne reçue : {userRating[0].average}</p>
                        ) : (
                            <p className="d-flex justify-content-start  p-1">Aucune note reçue</p>
                        )}

                    </Col>

                </Row>
            </Container>
        );
    }
}

export default withRouter(MyProfile);