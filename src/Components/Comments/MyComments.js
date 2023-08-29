import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../Common/with-router';
import { AuthContext } from "../../Context/AuthProvider";
import CommentService from "../../Service/CommentService";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MyComments extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);

        this.refreshList = this.refreshList.bind(this);
        this.getCommentSend = this.getCommentSend.bind(this)
        this.getCommentReceive = this.getCommentReceive.bind(this)

        this.state = {
            commentSend: [],
            commentReceive: [],
        };
    }

    componentDidMount() {
        this.getCommentSend(this.context.userData[0].user_id)
        this.getCommentReceive(this.context.userData[0].user_id)
    }

    getCommentSend(user_id) {
        CommentService.getCommentSend(user_id)
            .then(response => {
                this.setState({
                    commentSend: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    getCommentReceive(user_id) {
        CommentService.getCommentReceive(user_id)
            .then(response => {
                this.setState({
                    commentReceive: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.setState({
            comments: null,
            // comments: 0
        });
    }


    render() {
        const { commentSend, commentReceive } = this.state;
        const value = this.context
        console.log(commentReceive)
        return (
            <Container className="Home">
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>
                <Row className="d-flex justify-content-center">
                    <Row className="categories shadow-sm rounded py-2 mb-2 mt-4">
                        <h3 className="text-center">Liste des commentaires envoyés</h3>
                    </Row>
                    <Col >
                        <div className="table-responsive">
                            <Table striped bordered hover id="myTable" >
                                <thead>
                                    <tr>
                                        <th>Commentaire</th>
                                        <th>Note</th>
                                        <th>Actif</th>
                                        <th>Détail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        commentSend.map((comment, index) => (

                                            <tr>
                                                <td>
                                                    {comment.comment_description}
                                                </td>
                                                <td>
                                                    {comment.comment_rating}
                                                </td>
                                                <td>
                                                    {comment.comment_active ? "Oui" : "Non "}

                                                </td>

                                                <td>
                                                    <Link
                                                        className="btn buttonColor"
                                                        to={"/OneComment/" + comment.comment_id}
                                                    >

                                                        Détail

                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>

                <Row className="d-flex justify-content-center mb-5">
                    <Row className="categories shadow-sm rounded py-2 mb-2 mt-4">
                        <h3 className="text-center">Liste des commentaires reçus</h3>
                    </Row>
                    <Col >
                        <div className="table-responsive">
                            <Table striped bordered hover id="myTable" >
                                <thead>
                                    <tr>
                                        <th>Commentaire</th>
                                        <th>Note</th>
                                        <th>Actif</th>
                                        <th>Détail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        commentReceive.map((comment, index) => (

                                            <tr>
                                                <td>
                                                    {comment.comment_description}
                                                </td>
                                                <td>
                                                    {comment.comment_rating}
                                                </td>
                                                <td>
                                                    {comment.comment_active ? "Oui" : "Non "}

                                                </td>

                                                <td>
                                                    <Link
                                                        className="btn buttonColor"
                                                        to={"/OneComment/" + comment.comment_id}
                                                    >

                                                        Détail

                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>


        );
    }
}

export default withRouter(MyComments);