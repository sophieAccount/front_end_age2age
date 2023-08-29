import React, { Component } from "react";
import CategoriesService from "../../Service/CategoriesService";
import { withRouter } from '../../Common/with-router';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import "../../Style/UpdateCategorie.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const htmlspecialchars = require('htmlspecialchars');

class UpdateCategory extends Component {
    constructor(props) {
        super(props);
        this.onChangeType = this.onChangeType.bind(this);
        this.getTutorial = this.getTutorial.bind(this);
        this.updatecategory_active = this.updatecategory_active.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);

        this.state = {
            oneCategory: {
                category_id: null,
                category_type: "",
                category_active: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getTutorial(this.props.router.params.id);
    }

    onChangeType(e) {
        const category_type = e.target.value;

        this.setState(function (prevState) {
            return {
                oneCategory: {
                    ...prevState.oneCategory,
                    category_type: category_type
                }
            };
        });
    }


    getTutorial(id) {
        CategoriesService.get(id)
            .then(response => {
                this.setState({
                    oneCategory: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatecategory_active(status) {
        var data = {
            category_id: this.state.oneCategory.category_id,
            category_type: htmlspecialchars(this.state.oneCategory.category_type),
            category_active: status
        };

        CategoriesService.update(this.state.oneCategory.category_id, data)
            .then(response => {
                this.setState(prevState => ({
                    oneCategory: {
                        ...prevState.oneCategory,
                        category_active: status
                    }
                }));
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateCategory() {
        CategoriesService.update(
            this.state.oneCategory.category_id,
            this.state.oneCategory
        )
            .then(response => {
                this.setState({
                    message: "The category was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e.response, e.message);
            });
    }

    deleteCategory() {

        swal({
            title: "Voulez vous supprimer cette categorie ?",
            text: "Etes vous sur de vouloir supprimer cette catégorie ?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    CategoriesService.delete(this.state.oneCategory.category_id)
                    swal("Deleted!", "La catégorie a bien été supprimée", "success");
                }
            })
            .then(response => {
                this.props.router.navigate('/categories');
            })
            .catch(e => {
                console.log(e.message);
            });
    }


    render() {
        const { oneCategory } = this.state;

        return (
            <Container className="view">
                <a href="/Categories" className="d-flex justify-content-start">Retour</a>
                <Row className="d-flex justify-content-center">


                    {oneCategory ? (
                        <Col className="col-lg-9 col-12">
                            <h4>Categorie</h4>
                            <form>
                                <div className="d-flex flex-column mb-3">
                                    <label htmlFor="category_type">Nom de la catégorie</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="category_type"
                                        value={oneCategory.category_type}
                                        onChange={this.onChangeType}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        <strong>Statut: </strong>
                                        &nbsp;
                                        {oneCategory.category_active ? "Actif" : "Non actif"}
                                    </label>
                                </div>
                            </form>

                            {oneCategory.category_active ? (
                                <Button
                                    variant="danger"
                                    onClick={() => this.updatecategory_active(false)}
                                    className="m-5"
                                >
                                    Retirer
                                </Button>
                            ) : (
                                <Button
                                    variant="success"
                                    onClick={() => this.updatecategory_active(true)}
                                    className="m-5"
                                >
                                    Publier
                                </Button>
                            )}



                            <Button
                                onClick={this.updateCategory}
                                className="m-5"
                            >
                                Mettre à jour
                            </Button>
                            <Button
                                variant="danger"
                                onClick={this.deleteCategory}
                                className="m-5"
                            >
                                Supprimer
                            </Button>
                            <p>{this.state.message}</p>
                        </Col>
                    ) : (
                        <div>

                            <p className="message">Cette catégorie d'annonce n'existe pas</p>
                        </div>
                    )}
                </Row>
            </Container>
        );
    }
}

export default withRouter(UpdateCategory);