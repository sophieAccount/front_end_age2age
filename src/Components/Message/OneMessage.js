import React, { Component } from "react";
import MessageService from "../../Service/MessageService";
import { Link } from "react-router-dom";
import { withRouter } from '../../Common/with-router';
import Button from 'react-bootstrap/Button';
import "../../Style/OneComment.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs'
import { AuthContext } from "../../Context/AuthProvider";

class OneMessage extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.getMessages = this.getMessages.bind(this);

        this.state = {
            currentTutorial: {
                message_id: null,
                message_body: "",
            },
            message: ""
        };

    }

    componentDidMount() {
        this.getMessages(this.props.router.params.id);
    }

    getMessages(id) {
        MessageService.get(id)
            .then(response => {
                this.setState({
                    oneMessage: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });

    }


    render() {
        const { oneMessage } = this.state;
        const value = this.context
        console.log(oneMessage)
        return (
            <Container className="view border border-secondary rounded shadow-sm mb-5">
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

                <Row className="d-flex justify-content-center mt-5">
                    {oneMessage ? (
                        <Col className="col-lg-8 col-12">
                            <h4>Message</h4>
                            <div className="descritpion mt-5 mb-5">
                                {oneMessage.message_body}

                            </div>
                            <div className="date">
                                {/* <p>Envoyé par : </p> */}
                                <p>Envoyé le: {dayjs(oneMessage.comment_posted_on).format("DD/MM/YYYY")}</p>
                            </div>
                        </Col>
                    ) : (
                        <h2>Ce message n'existe pas </h2>
                    )}

                </Row>
            </Container>

        );
    }
}


export default withRouter(OneMessage);