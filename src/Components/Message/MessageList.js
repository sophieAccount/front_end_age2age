import React, { Component } from "react";
import MessageService from "../../Service/MessageService";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../Common/with-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MessagesList extends Component {
    constructor(props) {
        super(props);

        this.getMessages = this.getMessages.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMessage = this.setActiveMessage.bind(this);


        this.state = {
            messages: [],
            currentmessage: null,
            // currentIndex: 0,
        };
    }



    componentDidMount() {
        this.getMessages();
    }


    getMessages() {
        MessageService.getAll()
            .then(response => {
                this.setState({
                    messages: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.getMessages();
        this.setState({
            messages: null,
            // messages: 0
        });
    }

    setActiveMessage(message, index) {
        this.setState({
            messages: message,
            // currentIndex: index
        });
    }




    render() {
        const { messages } = this.state;

        return (
            <Container className="Home">
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>
                <Row className="categories shadow-sm rounded py-2 mb-5 mt-2">
                    <h3 className="text-center">Liste des messages</h3>
                </Row>
                <Row className="d-flex justify-content-center">

                    <div className="table-responsive">
                        <Table striped bordered hover >

                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Expéditeur</th>
                                    <th>Destinataire</th>
                                    <th>Détails</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages &&
                                    messages.map((message, index) => (
                                        <tr>
                                            <td>
                                                {message.message_body}
                                            </td>
                                            <td>
                                                {message.firstnameSend} {message.lastnameSend}
                                            </td>
                                            <td>
                                                {message.firstnameReceive}  {message.lastnameReceive}
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

export default withRouter(MessagesList);