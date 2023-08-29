import React, { Component } from "react";
import CategoriesService from "../../Service/CategoriesService";
import { Link } from "react-router-dom";
import { withRouter } from '../../Common/with-router';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class OneCategory extends Component {
    constructor(props) {
        super(props);
        this.getCategories = this.getCategories.bind(this);

        this.state = {
            currentTutorial: {
                category_id: null,
                category_type: "",
                category_active: false
            },
            message: ""
        };

    }

    componentDidMount() {
        this.getCategories(this.props.router.params.id);
    }

    getCategories(id) {
        CategoriesService.get(id)
            .then(response => {
                this.setState({
                    oneCategories: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });

    }

    render() {
        const { oneCategories } = this.state;

        return (
            <Container className="view">
                <a href="/Categories" className="d-flex justify-content-start">Retour</a>
                <Row className="d-flex justify-content-center">
                    <Col className="col-lg-9 col-12">
                        {oneCategories ? (
                            <div className="col-md-6">
                                <tr>
                                    <td>
                                        {oneCategories.category_type}
                                        {oneCategories.category_id}
                                    </td>
                                </tr>
                            </div>
                        ) : (
                            <h2 className="message">Cette catégorie d'annonce n'existe pas</h2>
                        )}
                    </Col>
                </Row>
            </Container>

        );
    }
}


export default withRouter(OneCategory);