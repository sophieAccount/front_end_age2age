import React, { Component } from "react";
import AdvertService from "../../Service/AdvertService";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../Common/with-router';
import { AuthContext } from "../../Context/AuthProvider";
import dayjs from 'dayjs'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AdvertValidate extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);

        this.getAdverts = this.getAdverts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveAdvert = this.setActiveAdvert.bind(this);
        this.updateAdvertActive = this.updateAdvertActive.bind(this);


        this.state = {
            adverts: [],
            currentAdvert: null,
            // currentIndex: 0,
        };
    }

    componentDidMount() {
        this.getAdverts();
    }

    updateAdvertActive(status) {
        var data = {
            advert_id: this.state.adverts.advert_id,
            advert_active: status
        };

        AdvertService.update(this.state.adverts.advert_id, data)
            .then(response => {
                this.setState(prevState => ({
                    adverts: {
                        ...prevState.adverts,
                        advert_active: status
                    }
                }));
            })
            .catch(e => {
                console.log(e);
            });
    }
    updateAdvertArchive(archive) {
        var data = {
            advert_id: this.state.adverts.advert_id,
            advert_archive: archive
        };

        AdvertService.update(this.state.adverts.advert_id, data)
            .then(response => {
                this.setState(prevState => ({
                    adverts: {
                        ...prevState.adverts,
                        advert_archive: archive
                    }
                }));
            })
            .catch(e => {
                console.log(e);
            });
    }

    getAdverts() {
        AdvertService.getAll()
            .then(response => {
                this.setState({
                    adverts: response.data
                });
            })
            .catch(e => {
                console.log(e.message);
            });
    }

    refreshList() {
        this.getAdverts();
        this.setState({
            adverts: null,
            // adverts: 0
        });
    }

    setActiveAdvert(advert, index) {
        this.setState({
            adverts: advert,
            // currentIndex: index
        });
    }

    render() {
        const { adverts } = this.state;
        const value = this.context
        console.log(adverts)
        return (
            <Container className=" p-0 m-0  Home">
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>
                <Row className="categories shadow-sm rounded py-2 mb-5 mt-2">
                    <h3 className="text-center">Liste des annonces</h3>
                </Row>
                <div className="table-responsive">

                    <Table striped bordered hover id="myTable" className="mb-5">

                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Auteur</th>
                                <th>Active</th>
                                <th>Archivée</th>
                                <th>Selectionnée</th>
                                <th>Date de Création</th>
                                <th>Détail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                adverts.map((advert, index) => (
                                    <>
                                        {!advert.advert_active && !advert.advert_archive ? (
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
                                                    {advert.advert_selected ? "Oui" : "Non "}

                                                </td>
                                                <td>
                                                    {dayjs(advert.createAt).format("DD/MM/YYYY")}
                                                </td>
                                                <td>
                                                    <Link
                                                        className="btn buttonColor"
                                                        to={"/AdvertDetailAdmin/" + advert.advert_id}
                                                    >

                                                        Détail

                                                    </Link>
                                                </td>
                                            </tr>

                                        ) : (
                                            null
                                        )}
                                    </>
                                ))}
                        </tbody>
                    </Table>
                </div>


            </Container>


        );
    }
}

export default withRouter(AdvertValidate);