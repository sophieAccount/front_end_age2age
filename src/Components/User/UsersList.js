import React, { Component } from "react";
import UserService from "../../Service/UserService";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../Common/with-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CSVLink, CSVDownload } from 'react-csv';

const headers = [
    { label: "First Name", key: "user_firstname" },
    { label: "Last Name", key: "user_lastname" },
    { label: "Email", key: "user_email_address" },
];

class UsersList extends Component {
    constructor(props) {
        super(props);

        this.getStats = this.getStats.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.getAllRating = this.getAllRating.bind(this);
        this.getAll = this.getAll.bind(this);

        this.state = {
            users: [],
            userList: [],
            advertCreated: { user_id: null },
            advertSelected: { user_id: null },
            data: [],
            userActif: false,
            dataCsv: [],
        };
    }

    componentDidMount() {
        this.getStats();
        this.getAll();
    }

    getStats() {
        UserService.getStats()
            .then(response => {
                this.setState({
                    users: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    getAll() {
        UserService.getAll()
            .then(response => {
                this.setState({
                    userList: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }


    getAllRating() {
        UserService.getAllRating()
            .then(response => {
                this.setState({
                    userRating: response.data
                });
            })
            .catch(e => {
                console.log(e.message);
            });
    }

    refreshList() {
        this.getStats();
        this.setState({
            users: null,
            // users: 0
        });
    }

    render() {
        const { users, data, csvReport, userList, userActif } = this.state;
        console.log(userActif)
        var headers = [
            { label: "Pseudo", key: "pseudo" },
            { label: "Nom", key: "nom" },
            { label: "Prénom", key: "prenom" },
            { label: "Annonces créées", key: "advertCreated" },
            { label: "Annonces selectionnées", key: "advertSelected" },
            { label: "Note moyenne", key: "noteMoyenne" },
            { label: "Actif", key: "actif" },

        ];

        var dataCsv = [];
        users.map((user, index) => {
            if(this.state.userActif === false || user.user_active === 1){
                dataCsv.push({
                    pseudo: user.user_pseudo,
                    nom: user.user_lastname,
                    prenom: user.user_firstname,
                    advertCreated: user.CREATED,
                    advertSelected: user.SELECTED,
                    noteMoyenne: user.RATING,
                    actif: user.user_active ? "Oui" : "Non"
                })
            }
        })



        return (
            <Container className="Home">
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>

                <Row className="categories shadow-sm rounded py-2 mb-5 mt-2">
                    <h3 className="text-center">Liste des utilisateurs</h3>
                </Row>
                <Row >
                    <div className="table-responsive">
                        {users ? (
                        <>
                        <h1>Statistique des utilisateurs</h1>
                        <Table striped bordered hover className="mb-5" >

                            <thead>
                                <tr>
                                    <th>Pseudo</th>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Annonces créées</th>
                                    <th>Annonces selectionnées</th>
                                    <th>Note moyenne</th>
                                    <th>Actif</th>
                                    <th>Détail</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    users.map((user, index) => (

                                        <tr>
                                            <td>
                                                {user.user_pseudo}
                                            </td>
                                            <td>
                                                {user.user_firstname}
                                            </td>
                                            <td>
                                                {user.user_lastname}
                                            </td>
                                            <td>
                                                {user.CREATED}
                                            </td>
                                            <td>
                                                {user.SELECTED}
                                            </td>
                                            <td>
                                                {user.RATING}
                                            </td>
                                            <td>
                                                {user.user_active ? "Oui" : "Non "}

                                            </td>
                                            <td>
                                                <Link
                                                    className="btn buttonColor"
                                                    to={"/UserDetailAdmin/" + user.user_id}
                                                >
                                                    Détail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                        </>) : (null)}
                        {userList ? (
                        <>
                        <h1>Listes des utilisateurs</h1>
                        <Table striped bordered hover className="mb-5" >

                            <thead>
                                <tr>
                                    <th>Pseudo</th>
                                    <th>Nom</th>
                                    <th>Prénom</th>

                                    <th>Actif</th>
                                    <th>Détail</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    userList.map((user, index) => (

                                        <tr>
                                            <td>
                                                {user.user_pseudo}
                                            </td>
                                            <td>
                                                {user.user_firstname}
                                            </td>
                                            <td>
                                                {user.user_lastname}
                                            </td>

                                            <td>
                                                {user.user_active ? "Oui" : "Non "}

                                            </td>
                                            <td>
                                                <Link
                                                    className="btn buttonColor"
                                                    to={"/UserDetailAdmin/" + user.user_id}
                                                >
                                                    Détail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                        </>
                        ) : (null)}
                    </div>
                </Row>

                <div>
                    <label>Seulement les utilisateurs actifs</label>
                    <input type="checkbox" onChange={(event) => this.setState({userActif: event.target.checked})}/>
                    <CSVLink className="btn btn-info" data={dataCsv} headers={headers} separator=";">
                        Télécharger stats utilisateurs
                    </CSVLink>
                </div>
            </Container>


        );
    }
}

export default withRouter(UsersList);