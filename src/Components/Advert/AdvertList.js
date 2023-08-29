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
import { CSVLink, CSVDownload } from 'react-csv';

class AdvertList extends Component {

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

        var headers = [
            { label: "Titre", key: "titre" },
            { label: "Auteur", key: "auteur" },
            { label: "Active", key: "active" },
            { label: "Archivée", key: "archive" },
            { label: "Selectionnée", key: "selection" },
            { label: "Date de Création", key: "date" },

          ];
          
          var dataCsv = [];
            adverts.map((advert, index) => (
                dataCsv.push({
                    titre: advert.advert_title,
                    auteur: advert.user_pseudo,
                    active: advert.advert_active,
                    archive: advert.advert_archive,
                    selection: advert.advert_selection,
                    date: dayjs(advert.advert_date).format('DD/MM/YYYY')
                })
            ))


        return (
            <Container className=" p-0 m-0  Home">
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>
                <Row className="categories shadow-sm rounded py-2 mb-5 mt-2">
                    <h3 className="text-center">Liste des annonces</h3>
                </Row>
                <div className="col-12">

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
                                            {dayjs(advert.createdAt).format("DD/MM/YYYY")}
                                            {/* {advert.createdAt} */}
                                        </td>
                                        <td>
                                            <Link
                                                to={"/AdvertDetailAdmin/" + advert.advert_id}
                                            >
                                                <Button variant="light">
                                                    Détail
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>

                <div className="btn btn-primary">
                <CSVLink className="btn btn-primary" data={dataCsv} headers={headers} separator=";">
                    Download me
                </CSVLink>
                </div>
            </Container>


        );
    }
}

export default withRouter(AdvertList);