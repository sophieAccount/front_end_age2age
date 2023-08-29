import React, { Component } from "react";
import UserService from "../../Service/UserService";
import { withRouter } from '../../Common/with-router';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { AuthContext, useAuthContext } from "../../Context/AuthProvider";
import RoleService from "../../Service/RoleService";
import "../../Style/UserdetailAdmin.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AdvertDetailAdmin extends Component {

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
        this.getRoleList = this.getRoleList.bind(this);
        this.updateUserRole = this.updateUserRole.bind(this);
        this.onChangeRoleUser = this.onChangeRoleUser.bind(this)
        this.updateUserActive = this.updateUserActive.bind(this);

        this.state = {
            oneUser: {
                user_id: null,
                user_active: false,
                role_id: ''
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
        this.getUser(this.props.router.params.id);
        this.getFav(this.props.router.params.id);
        this.getRating(this.props.router.params.id);
        this.getSelect(this.props.router.params.id);
        this.getAdvertCreatedByUser(this.props.router.params.id);
        this.getCommentUserSend(this.props.router.params.id);
        this.getCommentUserReceived(this.props.router.params.id)
        this.updateUserRole(this.props.router.params.id)
        this.getRoleList();
    }

    getUser(id) {
        UserService.get(id)
            .then(response => {

                this.setState({
                    oneUser: response.data,
                    role_id: response.data[0].role_id
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
    updateUserRole(role) {
        var data = {
            user_id: this.props.router.params.id,
            role_id: this.state.role_id
        }
        console.log("test", data)
        UserService.updateUserRole(this.props.router.params.id,
            data)
            .then(prevState => {
                console.log('hello')
                this.setState({
                    ...prevState.oneUser,
                    role_id: role
                });
            })
            .catch(e => {
                console.log(e.response, e.message);
            });
    }
    updateUserActive(status) {
        var data = {
            user_active: status,
        };
        console.log("toto", data);
        UserService.updateUserActive(Number(this.props.router.params.id), data)
            .then(prevState => {
                this.setState({
                    ...prevState.oneUser,
                    user_active: status
                });
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    }
    getRoleList() {
        RoleService.getAll()
            .then(response => {
                this.setState({
                    roles: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    onChangeRoleUser(e) {
        this.setState({
            role_id: e.target.value
        });
    }
    updateUserRole(role) {
        var data = {
            user_id: this.props.router.params.id,
            role_id: this.state.role_id
        }
        console.log("test", data)
        UserService.updateUserRole(this.props.router.params.id,
            data)
            .then(prevState => {
                console.log('hello')
                this.setState({
                    ...prevState.oneUser,
                    role_id: role
                });

                window.location.reload();
            })
            .catch(e => {
                console.log(e.response, e.message);
            });
    }

    render() {
        const { oneUser, userFav, advertCreated, advertSelected, userRating, commentReceive, commentSend, roles } = this.state;
        const value = this.context
        const toto = oneUser[0] ? oneUser[0] : ""
        console.log(toto.user_active)

        return (
            <Container className="border  view border-secondary shadow-sm rounded pb-3 mb-5">
                {value.userData[0].role_type == 'user' || value.userData[0].role_type == 'modérateur' ? (
                    <a href="/Admin" className="d-flex justify-content-start">
                        Retour
                    </a>) : (
                    null)
                }
                {value.userData[0].role_type == 'admin' || value.userData[0].role_type == 'super_admin' ? (
                    <a href="/UsersList" className="d-flex justify-content-start">
                        Retour
                    </a>) : (
                    null)
                }

                {oneUser[0] ? (
                    <Row className="d-flex justify-content-center">
                        <Col className="col-lg-6 col-12">
                            <h4 className="p-5 text-center">{oneUser[0].user_firstname} {oneUser[0].user_lastname}</h4>



                            {oneUser[0].user_active != 0 ? (
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => this.updateUserActive(false)}
                                >
                                    Désactiver
                                </Button>
                            ) : (
                                <Button
                                    variant="success"
                                    onClick={() => this.updateUserActive(true)}
                                >
                                    Activer
                                </Button>
                            )}
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
                            <div>
                                {value.userData[0].role_type == "super_admin" ?
                                    <div>
                                        <select value={this.state.role_id} onChange={this.onChangeRoleUser}>
                                            {roles.map((role, index) => (
                                                <option
                                                    comment_id="comment_id"
                                                    required
                                                    value={role.role_id}>
                                                    {role.role_type}
                                                </option>
                                            ))}
                                        </select>
                                        <Button
                                            onClick={this.updateUserRole}
                                        >
                                            Actualiser
                                        </Button>
                                    </div>
                                    :

                                    null
                                }
                            </div>



                            <p>{this.state.message}</p>
                        </Col>
                    ) : (
                        <div>
                            <p className="message">Cet utilisateur n'a aucune information</p>
                        </div>
                    )}

                    <Col className="col-lg-5 col-12 pt-5 mt-5 mx-auto">
                        {userFav[0] ? (
                            <p className="d-flex justify-content-start  p-1 message">Annonces favorites : {userFav[0].FavouriteAdvert} </p>
                        ) :
                            (
                                <p className="d-flex justify-content-start  p-1 message">Aucune annonce mise en favoris</p>
                            )}
                        {advertCreated[0] ? (
                            <p className="d-flex justify-content-start  p-1 message">Annonces créées : {advertCreated[0].created}</p>
                        ) : (
                            <p className="d-flex justify-content-start  p-1 message">Aucune annonce créé</p>
                        )}
                        {advertSelected[0] ? (
                            <p className="d-flex justify-content-start  p-1 message">Annonces selectionnées : {advertSelected[0].selected}</p>
                        ) : (
                            <p className="d-flex justify-content-start  p-1 message">Aucune annonce selectionnée</p>
                        )}
                        {userRating[0] ? (
                            <p className="d-flex justify-content-start  p-1 message">Note moyenne reçue : {userRating[0].average}</p>
                        ) : (
                            <p className="d-flex justify-content-start  p-1 message">Aucune note reçue</p>
                        )}
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default withRouter(AdvertDetailAdmin);