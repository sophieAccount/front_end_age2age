import React, { Component } from "react";
import MessageService from "../../Service/MessageService";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { AuthContext, useAuthContext } from "../../Context/AuthProvider";
import UserService from "../../Service/UserService";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const htmlspecialchars = require('htmlspecialchars');

export default class AddMessage extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);

        this.onChangeMessageBody = this.onChangeMessageBody.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.newMessage = this.newMessage.bind(this);
        this.onchangeUserReceive = this.onchangeUserReceive.bind(this);
        this.getUsers = this.getUsers.bind(this)

        this.state = {
            message_id: null,
            message_body: "",
            message_send_date: new Date(),
            user_id_send: "",
            user_id_receive: "",
            users: [],

            submitted: false
        };
    }

    componentDidMount() {
        this.getUsers();
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
    onChangeMessageBody(e) {
        this.setState({
            message_body: e.target.value
        });
    }
    onchangeUserReceive(e) {
        this.setState({
            user_id_receive: e.target.value
        });
    }

    saveMessage() {
        var data = {
            message_body: this.state.message_body,
            message_send_date: new Date(),
            user_id_receive: this.state.user_id_receive,
            user_id_send: this.context.userData[0].user_id,
        };

        MessageService.create(data)
            .then(response => {
                this.setState({
                    message_id: response.data.message_id,
                    message_body: htmlspecialchars(response.data.message_body),
                    user_id_receive: response.data.user_id_receive,

                    submitted: true
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    newMessage() {
        this.setState({
            message_id: null,
            message_body: "",
            message_send_date: new Date(),
            user_id_send: this.value.userData[0].user_id,
            user_id_receive: "",

            submitted: false
        });
    }

    render() {
        const value = this.context
        const { users } = this.state

        return (
            <Container className="view border border-secondary shoadow-sm rounded mb-5">
                {value.userData[0].role_type == 'user' ? (
                    <a href="/MyMessages" className="d-flex justify-content-start">
                        Retour
                    </a>) : (
                    null)
                }
                {value.userData[0].role_type == 'modérateur' || value.userData[0].role_type == 'admin' || value.userData[0].role_type == 'super_admin' ? (
                    <a href="/messages" className="d-flex justify-content-start">
                        Retour
                    </a>) : (
                    null)
                }

                <Row className="d-flex justify-content-center">
                    {this.state.submitted ? (

                        <h4 className="m-5 p-5">Votre message a bien été envoyé</h4>

                    ) : (
                        <Col className="col-lg-6 col-12">
                            <h5 className="m-5">Nouveau message</h5>
                            <div className="d-flex flex-column">
                                <label className="mt-3">Message</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    message_id="message_body"
                                    required
                                    value={this.state.message_body}
                                    onChange={this.onChangeMessageBody}
                                    name="message_body"
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <label className="fw-bold mt-3">Destinataire</label>
                                <select
                                    className="text-center mt-3 form-control"
                                    value={this.state.user_id_receive}
                                    onChange={this.onchangeUserReceive}>
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
                            <Button onClick={this.saveMessage} className="btn btn-success mt-3">
                                Envoyer
                            </Button>
                        </Col>
                    )}
                </Row>
            </Container>
        );
    }
}