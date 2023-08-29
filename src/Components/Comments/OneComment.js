import React, { Component } from "react";
import CommentService from "../../Service/CommentService";
import { Link } from "react-router-dom";
import { withRouter } from '../../Common/with-router';
import Button from 'react-bootstrap/Button';
import "../../Style/OneComment.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs'
import { AuthContext } from "../../Context/AuthProvider";

class OneComment extends Component {

    static contextType = AuthContext
    constructor(props) {
        super(props);
        this.getCategories = this.getCategories.bind(this);

        this.state = {
            currentTutorial: {
                category_id: null,
                category_type: "",
                category_active: false,
                comment_posted_on: ''
            },
            message: ""
        };

    }

    componentDidMount() {
        this.getCategories(this.props.router.params.id);
    }

    getCategories(id) {
        CommentService.get(id)
            .then(response => {
                this.setState({
                    onComment: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });

    }


    render() {
        const { onComment } = this.state;
        console.log(onComment)
        const value = this.context
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
                    <Col className="col-lg-8 col-12 mt-5">
                        {onComment ? (
                            <div>
                                <h4 className="text-center">Commentaire</h4>
                                <p>Description : {onComment.comment_description}</p>
                                <p>Note : {onComment.comment_rating}</p>
                                <p>Créé le {dayjs(onComment.comment_posted_on).format("DD/MM/YYYY")}</p>
                            </div>
                        ) : (
                            <h2>Ce commentaire n'existe pas</h2>
                        )}
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center mt-5">
                    {onComment ? (
                        <Col className="col-lg-8 col-12">
                            <Link

                                to={"/AddMessage/"}
                            >
                                <Button variant="success">
                                    Répondre
                                </Button>
                            </Link>
                        </Col>
                    ) : (
                        null
                    )}

                </Row>
            </Container >

        );
    }
}


export default withRouter(OneComment);