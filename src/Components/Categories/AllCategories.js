import React, { Component } from "react";
import CategoriesService from "../../Service/CategoriesService";
import { Link } from "react-router-dom";
import { withRouter } from '../../Common/with-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../../Style/AllCategories.css";

class AllCategories extends Component {
    constructor(props) {
        super(props);

        this.getCategories = this.getCategories.bind(this);

        this.state = {
            categories: [],
            currentcategory: null,
            // currentIndex: 0,
        };
    }

    componentDidMount() {
        this.getCategories();
    }


    getCategories() {
        CategoriesService.getAll()
            .then(response => {
                this.setState({
                    categories: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }




    render() {
        const { categories } = this.state;

        return (
            <Container className="Home">
                <Row className="categories rounded shadow-sm p-3 mb-5">
                    <h3 className="text-center">Catégories</h3>
                </Row>
                <Row className="d-flex justify-content-center">

                    <Col className="col-12 categoriesFlex">

                        {categories &&
                            categories.map((category, index) => (
                                <div className="AllCategoriesDiv">
                                    {category.category_active ? (
                                        <Card className="col-lg-6 col-12">
                                            <Card.Body className="AllCategories shadow-sm">
                                                <Card.Title>{category.category_type}</Card.Title>
                                                <Link 
                                                className="btn buttonColor"
                                                to={`/Category/${category.category_id}`}
                                                >
                                                   Voir les annonces
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    ) : (null)}

                                </div>
                            ))}

                    </Col>
                </Row>


            </Container>


        );
    }
}

export default withRouter(AllCategories);