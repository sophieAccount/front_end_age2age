import React, { Component } from "react";
import CategoriesService from "../../Service/CategoriesService";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { AuthContext } from "../../Context/AuthProvider";
import "../../Style/UserdetailAdmin.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const htmlspecialchars = require('htmlspecialchars');

export default class AddCategory extends Component {

    static contextType = AuthContext


    constructor(props) {
        super(props);

        this.onChangeType = this.onChangeType.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
        this.newCategory = this.newCategory.bind(this);

        this.state = {
            category_id: null,
            category_type: "",
            category_active: false,

            submitted: false
        };
    }

    onChangeType(e) {
        this.setState({
            category_type: e.target.value
        });
    }



    saveCategory() {
        var data = {
            category_type: this.state.category_type,
        };

        CategoriesService.create(data)
            .then(response => {
                this.setState({
                    category_id: response.data.category_id,
                    category_type: htmlspecialchars(response.data.category_type),
                    category_active: response.data.category_active,

                    submitted: true
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    newCategory() {
        this.setState({
            category_id: null,
            category_type: "",
            category_active: false,

            submitted: false
        });
    }

    render() {
        const value = this.context
        console.log(value.userData.user_id)

        return (
            <Container className="view border border-secondary shadow-sm rounded mb-5">
                <a href="/Categories" className="d-flex justify-content-start">Retour</a>
                <Row className="d-flex justify-content-center pt-5">
                    <h5 className="mt-3 mb-2">Ajouter une nouvelle catégorie</h5>
                    {this.state.submitted ? (
                        <div>
                            <h4>La nouvelle catégorie d'annonce a bien été créée</h4>
                        </div>
                    ) : (
                        <Col className="col-lg-8 col-12">
                            <div className="d-flex flex-column mb-3">
                                <label htmlFor="category_type p-2">Nom de la catégorie</label>
                                <input
                                    type="text"
                                    className="form-control p-2"
                                    category_id="category_type"
                                    required
                                    value={this.state.category_type}
                                    onChange={this.onChangeType}
                                    name="category_type"
                                />
                            </div>


                            <button onClick={this.saveCategory} className="btn btn-success">
                                Ajouter
                            </button>
                        </Col>
                    )}
                </Row>
            </Container>
        );
    }
}