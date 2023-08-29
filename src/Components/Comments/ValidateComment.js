import React, { Component } from "react";
import CommentService from "../../Service/CommentService";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../Common/with-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs'
import "../../Style/App.css";

class ValidateComment extends Component {
    constructor(props) {
        super(props);

        this.getComments = this.getComments.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveComment = this.setActiveComment.bind(this);


        this.state = {
            comments: [],
            currentcomment: null,
            // currentIndex: 0,
        };
    }


    componentDidMount() {
        this.getComments();
    }

    getComments() {
        CommentService.getAll()
            .then(response => {
                this.setState({
                    comments: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.getComments();
        this.setState({
            comments: null,
            // comments: 0
        });
    }

    setActiveComment(comment, index) {
        this.setState({
            comments: comment,
            // currentIndex: index
        });
    }

    render() {
        const { comments } = this.state;

        return (

            <Container className="Home">
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>
                <Row className="categories shadow-sm rounded py-2 mb-5 mt-2">
                    <h3 className="text-center">Liste des commentaires</h3>
                </Row>
                <Row className="d-flex justify-content-center">

                    <div className="table-responsive">
                        <Table striped bordered hover >

                            <thead>
                                <tr>
                                    <th>Utilisateur expéditeur</th>
                                    <th>Date</th>
                                    <th>Statut</th>
                                    <th>Détail</th>
                                    <th>Modifier</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments &&
                                    comments.map((comment, index) => (
                                        <>
                                            {!comment.comment_active ? (
                                                <>
                                                    <tr className="">
                                                        <td className="ellipsis">
                                                            {comment.user_pseudo}
                                                        </td>
                                                        <td>
                                                            {dayjs(comment.comment_posted_on).format("DD/MM/YYYY")}
                                                        </td>
                                                        <td>
                                                            {comment.comment_active ? "Actif" : "Non actif"}
                                                        </td>
                                                        <td>
                                                            <Link
                                                                className="btn buttonColor"
                                                                to={"/OneComment/" + comment.comment_id}
                                                            >
                                                                Détail
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={"/UpdateComment/" + comment.comment_id}
                                                            >
                                                                <Button
                                                                    variant="warning"
                                                                >
                                                                    Modifier
                                                                </Button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                </>
                                            ) : (
                                                null
                                            )}
                                        </>
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default withRouter(ValidateComment);