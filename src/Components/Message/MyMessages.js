import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../Common/with-router';
import { AuthContext } from "../../Context/AuthProvider";
import MessageService from "../../Service/MessageService";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs'


class MyMessages extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);

        this.refreshList = this.refreshList.bind(this);
        this.findMessageSend = this.findMessageSend.bind(this)
        this.findMessageReveive = this.findMessageReveive.bind(this)

        this.state = {
            messagesSend: [],
            messagesReceived: [],
        };
    }

    componentDidMount() {
        this.findMessageSend(this.context.userData[0].user_id)
        this.findMessageReveive(this.context.userData[0].user_id)
    }

    findMessageSend(user_id) {
        MessageService.findMessageSend(user_id)
            .then(response => {
                this.setState({
                    messagesSend: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    findMessageReveive(user_id) {
        MessageService.findMessageReveive(user_id)
            .then(response => {
                this.setState({
                    messagesReceived: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.getAdverts();
        this.setState({
            adverts: null,
            // adverts: 0
        });
    }


    render() {
        const { messagesSend, messagesReceived } = this.state;
        const value = this.context
        return (
            <Container className="Home">
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>

                <Row className="d-flex justify-content-center">
                    <Row className="categories shadow-sm rounded py-2 mb-2 mt-3">
                        <h3 className="text-center">Liste des messages reçu</h3>
                    </Row>
                    <Table striped bordered hover id="myTable" >
                        <thead>
                            <tr>
                                <th>Message</th>
                                <th>Date d'envois</th>
                                <th>Détail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                messagesSend.map((message, index) => (

                                    <tr>
                                        <td>
                                            {message.message_body}
                                        </td>
                                        <td>
                                            {dayjs(message.message_send_date).format("DD/MM/YYYY")}

                                        </td>
                                        <td>
                                            <Link
                                                className="btn buttonColor"
                                                to={"/OneMessage/" + message.message_id}
                                            >

                                                Détail

                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Row>

                <Row className="d-flex justify-content-center">
                    <Row className="categories shadow-sm rounded py-2 mb-2 mt-3">
                        <h3 className="text-center">Liste des messages envoyés</h3>
                    </Row>
                    <div className="table-responsive">
                        <Table striped bordered hover id="myTable" >
                            <thead>
                                <tr>
                                    <th>Message</th>
                                    <th>Utilisateur</th>

                                    <th>Détail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    messagesReceived.map((message, index) => (

                                        <tr>
                                            <td>
                                                {message.message_body}
                                            </td>
                                            <td>
                                                {message.user_pseudo}
                                            </td>

                                            <td>
                                            <Link
                                                className="btn buttonColor"
                                                to={"/OneMessage/" + message.message_id}
                                            >

                                                Détail

                                            </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>
            </Container>


        );
    }
}

export default withRouter(MyMessages);