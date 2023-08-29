import React, { Component } from "react";
import AdvertService from "../../Service/AdvertService";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../Common/with-router';
import { AuthContext } from "../../Context/AuthProvider";
import UserService from "../../Service/UserService";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MyAdverts extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);

        this.refreshList = this.refreshList.bind(this);
        this.findAdvertCreated = this.findAdvertCreated.bind(this)
        this.findAdvertSelected = this.findAdvertSelected.bind(this)
        this.getUserFavouriteAdverts = this.getUserFavouriteAdverts.bind(this)

        this.state = {
            advertsCreated: [],
            advertSelected: [],
            favouriteAdverts: []
        };
    }

    componentDidMount() {
        this.findAdvertCreated(this.context.userData[0].user_id)
        this.findAdvertSelected(this.context.userData[0].user_id)
        this.getUserFavouriteAdverts(this.context.userData[0].user_id)
    }

    getUserFavouriteAdverts(user_id) {
        UserService.getUserFavouriteAdverts(user_id)
            .then(response => {
                this.setState({
                    favouriteAdverts: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    findAdvertCreated(user_id) {
        AdvertService.findAdvertCreated(user_id)
            .then(response => {
                this.setState({
                    advertsCreated: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    findAdvertSelected(user_id) {
        AdvertService.findAdvertSelected(user_id)
            .then(response => {
                this.setState({
                    advertSelected: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.getAdverts();
        this.setState({
            adverts: null,
            // adverts: 0
        });
    }


    render() {
        const { advertsCreated, advertSelected, favouriteAdverts } = this.state;
        const value = this.context
        return (
            <Container className="Home">
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>
                <Row className="d-flex justify-content-center">
                    <Row className="categories shadow-sm rounded py-2 mb-2 mt-3">
                        <h3 className="text-center">Liste des annonces créées</h3>
                    </Row>
                    <div className="table-responsive">
                        <Table striped bordered hover id="myTable">
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Auteur</th>
                                    <th>Actif</th>
                                    <th>Archive</th>
                                    <th>Détail</th>
                                    <th>Modifier</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    advertsCreated.map((advert, index) => (

                                        <tr>
                                            <td>
                                                {advert.advert_title}
                                            </td>
                                            <td>
                                                {advert.user_pseudo}
                                            </td>
                                            <td>
                                                {advert.advert_active ? "Oui" : "Non "}
                                            </td>
                                            <td>
                                                {advert.advert_archive ? "Oui" : "Non "}
                                            </td>
                                            <td>
                                                <Link
                                                    className="btn buttonColor"
                                                    to={"/AdvertDetailAdmin/" + advert.advert_id}
                                                >

                                                    Détail

                                                </Link>
                                            </td>
                                            <td>
                                                <Link
                                                    to={"/modifyAdvert/" + advert.advert_id}
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
                </Row>

                <Row className="d-flex justify-content-center mt-5">
                    <Row className="categories shadow-sm rounded py-2 mb-2 mt-3">
                        <h3 className="text-center">Liste des annonces selectionnées</h3>
                    </Row>
                    <div className="table-responsive">
                        <Table striped bordered hover id="myTable" >
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Actif</th>
                                    <th>Archive</th>
                                    <th>Détail</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    advertSelected.map((advert, index) => (

                                        <tr>
                                            <td>
                                                {advert.advert_title}
                                            </td>
                                            <td>
                                                {advert.advert_active ? "Oui" : "Non "}
                                            </td>
                                            <td>
                                                {advert.advert_archive ? "Oui" : "Non "}
                                            </td>
                                            <td>
                                                <Link
                                                    className="btn buttonColor"
                                                    to={"/AdvertDetails/" + advert.advert_id}
                                                >

                                                    Détail

                                                </Link>

                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>

                <Row className="d-flex justify-content-center mt-5">
                    <Row className="categories shadow-sm rounded py-2 mb-2 mt-3">
                        <h3 className="text-center">Liste des annonces favorites</h3>
                    </Row>
                    <div className="table-responsive">
                        <Table striped bordered hover id="myTable" className="mb-5" >
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Actif</th>
                                    <th>Archive</th>
                                    <th>Détail</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    favouriteAdverts.map((advert, index) => (

                                        <tr>
                                            <td>
                                                {advert.advert_title}
                                            </td>
                                            <td>
                                                {advert.advert_active ? "Oui" : "Non "}
                                            </td>
                                            <td>
                                                {advert.advert_archive ? "Oui" : "Non "}
                                            </td>
                                            <td>
                                                <Link
                                                    className="btn buttonColor"
                                                    to={"/AdvertDetails/" + advert.advert_id}
                                                >

                                                    Détail

                                                </Link>

                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>
            </Container>


        );
    }
}

export default withRouter(MyAdverts);