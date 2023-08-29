import React, { Component } from "react";
import CommentService from "../../Service/CommentService";
import { withRouter } from '../../Common/with-router';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import "../../Style/UpdateComment.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class UpdateComment extends Component {
    constructor(props) {
        super(props);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getComment = this.getComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.updateCommentActive = this.updateCommentActive.bind(this);

        this.state = {
            oneComment: {
                comment_id: null,
                comment_description: "",
                comment_active: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getComment(this.props.router.params.id);
    }

    onChangeDescription(e) {
        const comment_description = e.target.value;

        this.setState(function (prevState) {
            return {
                oneComment: {
                    ...prevState.oneComment,
                    comment_description: comment_description
                }
            };
        });
    }


    getComment(id) {
        CommentService.get(id)
            .then(response => {
                this.setState({
                    oneComment: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateCommentActive(status) {
        var data = {
            comment_id: this.state.oneComment.comment_id,
            comment_description: this.state.oneComment.comment_description,
            comment_active: status
        };

        CommentService.update(this.state.oneComment.comment_id, data)
            .then(response => {
                this.setState(prevState => ({
                    oneComment: {
                        ...prevState.oneComment,
                        comment_active: status
                    }
                }));
            })
            .catch(e => {
                console.log(e.message, e.response);
            });
    }

    updateComment() {
        CommentService.update(
            this.state.oneComment.comment_id,
            this.state.oneComment
        )
            .then(response => {
                this.setState({
                    message: "The comment was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e.response, e.message);
            });
    }

    deleteCategory() {
        swal({
            title: "Voulez vous supprimer ce commentaire ?",
            text: "Are you sure that you want to leave this page?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    CommentService.delete(this.state.oneComment.comment_id)
                    swal("Deleted!", "Le commentaire a bien été supprimé", "success");
                }
            })
            .then(response => {
                this.props.router.navigate('/comments');
            })
            .catch(e => {
                console.log(e.message);
            });
    }


    render() {
        const { oneComment } = this.state;

        return (
            <Container className="view rounded shadow-sm border border-secondary">
                <a href="/comments" className="d-flex justify-content-start">Retour</a>
                <h4 className="text-center p-3">Commentaire</h4>
                <Row className="d-flex justify-content-center">
                    {oneComment ? (
                        <Col className="col-lg-8 col-12">
                            <div >
                                <label className="p-1" htmlFor="comment_description">Description du commentaire</label>
                                <p>{oneComment.comment_description}</p>
                            </div>

                            <div>

                                <strong>Statut:</strong>
                                &nbsp;
                                {oneComment.comment_active ? "Actif" : "Non actif"}
                                &nbsp;

                            </div>

               
                            {oneComment.comment_active ? (
                                <Button
                                    variant="danger"
                                    className="m-2"
                                    onClick={() => this.updateCommentActive(false)}
                                >
                                    Retirer
                                </Button>
                            ) : (
                                <Button
                                    variant="success"
                                    className="m-2"
                                    onClick={() => this.updateCommentActive(true)}
                                >
                                    Publier
                                </Button>
                            )}


                            <Button variant="danger"
                                className="m-2"
                                onClick={this.deleteCategory}
                            >
                                Supprimer
                            </Button>
                            <p>{this.state.message}</p>
                        </Col>
                    ) : (
                   null
                    )}
                </Row>
            </Container>
        );
    }
}

export default withRouter(UpdateComment);