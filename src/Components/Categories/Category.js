import React, { Component } from "react";
import AdvertService from "../../Service/AdvertService";
import { Link } from "react-router-dom";
import { withRouter } from '../../Common/with-router';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CategoriesService from "../../Service/CategoriesService";
import "../../Style/Category.css";

class Category extends Component {
    constructor(props) {
        super(props);
        this.findAdvertByCategory = this.findAdvertByCategory.bind(this);
        this.getCategories = this.getCategories.bind(this);


        this.state = {
            currentTutorial: {
                oneAdvertCategory: [],
                category_id: null,
            },
            message: ""
        };

    }

    componentDidMount() {
        this.findAdvertByCategory(this.props.router.params.id);
        this.getCategories(this.props.router.params.id);
    }

    findAdvertByCategory(id) {
        AdvertService.findAdvertByCategory(id)
            .then(response => {
                this.setState({
                    oneAdvertCategory: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });

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
        const { oneAdvertCategory, oneCategories } = this.state;
        console.log(oneCategories)
        return (
            <Container className="Home">
                {oneCategories ? (<h1 className="text-center age2age">{oneCategories.category_type}</h1>) : (
                    <span>Aucune annonce ne correspondant à cette catégorie</span>)}
                <Row className="d-flex justify-content-center">
                    <Col className="col-12 advertCategoresFlex" >
                        {oneAdvertCategory &&
                            oneAdvertCategory.map((advert, index) => (

                                <>
                                    {!advert.advert_selected && advert.advert_active ? (
                                        <Row className="m-1 advertOne">
                                            <Card className="card col-12 col-lg-6 cardAdvert shadow-sm">
                                                <Card.Body>
                                                    <Card.Title>{advert.advert_title}</Card.Title>
                                                    <Card.Text>
                                                        {advert.advert_description}
                                                    </Card.Text>
                                                    <Link 
                                                    className="btn buttonColor"
                                                    to={`/AdvertDetails/${advert.advert_id}`}
                                                    >Détails
                                                    </Link>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                    ) : (null)
                                    }

                                </>
                            ))}
                    </Col>
                </Row>
            </Container>

        );
    }
}


export default withRouter(Category);