import React, { Component } from "react";
import CategoriesService from "../../Service/CategoriesService";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../Common/with-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CategoriesList extends Component {
    constructor(props) {
        super(props);

        this.getCategories = this.getCategories.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCategories = this.setActiveCategories.bind(this);

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

    refreshList() {
        this.getCategories();
        this.setState({
            categories: null,
            // categories: 0
        });
    }

    setActiveCategories(category, index) {
        this.setState({
            categories: category,
            // currentIndex: index
        });
    }




    render() {
        const { categories } = this.state;

        return (
            <Container className="Home">
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>
                <Row className="categories shadow-sm rounded py-2 mb-5 mt-2">
                    <h3 className="text-center">Liste des catégories</h3>
                </Row>
                <Row >

                    <Col className="col-12">
                        <div className="table-responsive">
                            <Table striped bordered hover >

                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Statut</th>
                                        <th>Modifier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories &&
                                        categories.map((category, index) => (
                                            <tr>
                                                <td>
                                                    {category.category_type}
                                                </td>
                                                <td>
                                                    {category.category_active ? "Actif" : "Non actif"}
                                                </td>

                                                <td>
                                                    <Link
                                                        to={"/UpdateCategory/" + category.category_id}
                                                    >
                                                        <Button variant="warning">
                                                            Modifier
                                                        </Button>
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

export default withRouter(CategoriesList);