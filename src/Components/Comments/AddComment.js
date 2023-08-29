import React, { Component } from "react";
import CommentService from "../../Service/CommentService";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { AuthContext, useAuthContext } from "../../Context/AuthProvider";
import AdvertService from "../../Service/AdvertService";
import { withRouter } from "../../Common/with-router";
import UserService from "../../Service/UserService";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const htmlspecialchars = require('htmlspecialchars');

class AddComment extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);

        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onchangeUserReceive = this.onchangeUserReceive.bind(this);
        this.saveComment = this.saveComment.bind(this);
        this.newComment = this.newComment.bind(this);
        this.getUsers = this.getUsers.bind(this)

        this.state = {
            comment_id: null,
            comment_rating: "",
            comment_description: "",
            comment_posted_on: new Date(),
            comment_active: false,
            user_id_send: "",
            user_id_receive: this.props.selected,
            responseAdvert: '',
            users: [],
            user_id: '',
            submitted: false,
        };
    }

    componentDidMount() {
        this.getUsers();
    }
    getAdvert(id) {
        const responseAdvert = AdvertService.get(id)
            .then(responseAdvert => {
                this.setState({
                    responseAdvert: responseAdvert.data.user_id_create
                });
            })
            .catch(e => {
                console.log(e);
            });
        return responseAdvert

    }

    getUsers() {
        UserService.getAll()
            .then(response => {
                this.setState({
                    users: response.data
                });
            })
            .catch(e => {
                console.log(e.message);
            });
    }


    onChangeDescription(e) {
        this.setState({
            comment_description: e.target.value
        });
    }
    onChangeRating(e) {
        this.setState({
            comment_rating: e.target.value
        });
    }
    onchangeUserReceive(e) {
        console.log('utilisateur selectionné')
        this.setState({
            user_id_receive: e.target.value

        });
    }

    saveComment() {
        var data = {
            comment_description: this.state.comment_description,
            comment_rating: this.state.comment_rating,
            user_id_send: this.context.userData[0].user_id,
            comment_posted_on: new Date(),
            user_id_receive: this.state.user_id_receive
        };
        CommentService.create(data)
            .then(response => {
                this.setState({
                    comment_id: response.data.comment_id,
                    comment_description: htmlspecialchars(response.data.comment_description),
                    user_id_receive: response.data.user_id_receive,
                    user_id_send: response.data.user_id_send,
                    comment_rating: htmlspecialchars(response.data.comment_rating),

                    submitted: true
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    newComment() {
        this.setState({
            comment_id: null,
            comment_rating: "",
            comment_description: "",
            comment_posted_on: new Date(),
            comment_active: false,
            user_id_send: this.value.userData.user_id,
            user_id_receive: "",

            submitted: false
        });
    }

    render() {
        const value = this.context
        const { advert, users } = this.state
        return (
            <Container className="view border border-secondary shadow-sm rounded mb-5">
                {value.userData[0].role_type == 'user' ? (
                    <a href="/MyComments" className="d-flex justify-content-start">Retour</a>) : (
                    null)
                }
                {value.userData[0].role_type == 'modérateur' || value.userData[0].role_type == 'admin' || value.userData[0].role_type == 'super_admin' ? (
                    <a href="/comments" className="d-flex justify-content-start">Retour</a>) : (
                    null)
                }

                <Row className="d-flex justify-content-center">
                    <h5 className="text-center m-5">Ajouter un commentaire</h5>
                    {this.state.submitted ? (

                        <h4>Merci pour votre participation</h4>


                    ) : (
                        <Col className="col-lg-6 col-12">
                            <div className="d-flex flex-column mb-3">
                                <label className="p-1" htmlFor="comment_description">Description du commentaire</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    comment_id="comment_description"
                                    required
                                    value={this.state.comment_description}
                                    onChange={this.onChangeDescription}
                                    name="comment_description"
                                />
                            </div>
                            <div className="d-flex flex-column mb-3">
                                <label htmlFor="comment_rating">Note du service</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    className="form-control"
                                    comment_id="comment_rating"
                                    required
                                    value={this.state.comment_rating}
                                    onChange={this.onChangeRating}
                                    name="comment_rating"
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <select
                                    className="form-control text-center"
                                    value={this.state.user_id_receive} onChange={this.onchangeUserReceive}>
                                    {users.map((user, index) => (
                                        <option
                                            comment_id="user_id"
                                            required
                                            value={user.user_id}>
                                            {user.user_pseudo}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <Button onClick={this.saveComment} className="btn btn-success mt-3">
                                Valider
                            </Button>
                        </Col>
                    )}
                </Row>
            </Container>
        );
    }
}

export default withRouter(AddComment)