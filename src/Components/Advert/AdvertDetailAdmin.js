import React, { Component } from "react";
import AdvertService from "../../Service/AdvertService";
import { withRouter } from '../../Common/with-router';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import "../../Style/AdvertAdminDetail.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs'
import swal from 'sweetalert';

class AdvertDetailAdmin extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.getAdvert = this.getAdvert.bind(this);
        this.updateAdvert = this.updateAdvert.bind(this);
        this.deleteAdvert = this.deleteAdvert.bind(this)

        this.state = {
            oneAdvert: {
                advert_id: null,
                advert_description: "",
                advert_active: false,
                advert_archive: false,
                updatedAt: new Date,
                user_id_select: '',
                isFavourite: false,
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getAdvert(this.props.router.params.id);

    }

    getAdvert(id) {
        AdvertService.get(id)
            .then(response => {
                this.setState({
                    oneAdvert: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateAdvertActive(status) {
        var data = {
            advert_id: this.state.oneAdvert.advert_id,
            advert_title: this.state.oneAdvert.advert_title,
            advert_description: this.state.oneAdvert.advert_description,
            advert_active: status,
            updatedAt: new Date()
        };

        AdvertService.update(this.state.oneAdvert.advert_id, data)
            .then(response => {
                this.setState(prevState => ({
                    oneAdvert: {
                        ...prevState.oneAdvert,
                        advert_active: status,
                        updatedAt: new Date()
                    }
                }));
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateAdvertArchive(archive) {
        var data = {
            advert_id: this.state.oneAdvert.advert_id,
            advert_archive: archive,
            updatedAt: new Date()
        };
        AdvertService.update(this.state.oneAdvert.advert_id, data)
            .then(response => {
                this.setState(prevState => ({
                    oneAdvert: {
                        ...prevState.oneAdvert,
                        advert_archive: archive,
                        updatedAt: new Date(),
                    }
                }));
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateAdvert() {
        AdvertService.update(
            this.state.oneAdvert.advert_id,
            this.state.oneAdvert,
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

    deleteAdvert() {
        swal({
            title: "Voulez vous supprimer cette annonce ?",
            Text: 'Cette annonce va être supprimée',
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    AdvertService.delete(this.state.oneAdvert.advert_id)
                    swal("Suprimée!", "L'annonce a bien été supprimée", "success");
                }
            })

            .then(response => {
                if (this.context.userData[0].role_type == 'admin' || this.context.userData[0].role_type == 'super_admin') {
                    this.props.router.navigate('/AdvertList');
                } else {
                    this.props.router.navigate('/MyAdverts');
                }

            })
            .catch(e => {
                console.log(e.message);
            });
    }



    render() {
        const { oneAdvert } = this.state;
        const value = this.context
        console.log(value.userData[0].role_type)
        return (
            <Container className="view mb-5" id="advertDetailAdmin">
                {value.userData[0].role_type == 'user' ? (
                    <a href="/MyAdverts" className="d-flex justify-content-start">Retour</a>) : (
                    null)
                }
                {value.userData[0].role_type == 'modérateur' || value.userData[0].role_type == 'admin' || value.userData[0].role_type == 'super_admin' ? (
                    <a href="/AdvertList" className="d-flex justify-content-start">Retour</a>) : (
                    null)
                }
                {oneAdvert ? (
                    <Row className="justify-content-evenly">
                        <h4 className="text-center p-5">{oneAdvert.advert_title}</h4>
                        <Col className="col-lg-5 col-12 ">
                            <p className="d-flex justify-content-start p-1"><strong>Description</strong> : {oneAdvert.advert_description}</p>
                            <p className="d-flex justify-content-start  p-1"><strong>Adresse</strong>  : {oneAdvert.advert_address}</p>
                            <p className="d-flex justify-content-start  p-1"><strong>Publiée le</strong> : {dayjs(oneAdvert.createAt).format("DD/MM/YYYY")}</p>
                            <p className="d-flex justify-content-start  p-1"><strong>Active</strong> : {oneAdvert.advert_active ? "actif" : "non actif"}</p>
                            <p className="d-flex justify-content-start  p-1"><strong>Selectionnée</strong> : {oneAdvert.advert_selected ? "selectionné" : "Non selectionné"}</p>
                            <p className="d-flex justify-content-start  p-1"><strong>Archivée</strong> : {oneAdvert.advert_archive ? "archivé" : "Non archivé"}</p>
                        </Col>


                        <Col className=" col-lg-5 col-12">
                            {value.userData[0].role_type == 'admin' || value.userData[0].role_type == 'modérateur'|| value.userData[0].role_type == 'super_admin' ? (
                                <div>
                                    {
                                        oneAdvert.advert_active ? (
                                            <Button
                                                variant="danger"
                                                onClick={() => this.updateAdvertActive(false)}
                                            >
                                                Désactiver
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="success"
                                                onClick={() => this.updateAdvertActive(true)}
                                            >
                                                Activer
                                            </Button>
                                        )
                                    }
                                    {oneAdvert.advert_archive ? (
                                        <Button
                                            variant="danger"
                                            onClick={() => this.updateAdvertArchive(false)}
                                        >
                                            Désarchiver
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="success"
                                            onClick={() => this.updateAdvertArchive(true)}
                                        >
                                            Archiver
                                        </Button>
                                    )}
                                </div>
                            ) : (null)}

                            <Button
                                variant="danger"
                                onClick={this.deleteAdvert}
                                className="m-5"
                            >
                                Supprimer
                            </Button>

                        </Col>


                        <p>{this.state.message}</p>
                    </Row>
                ) : (
                    <div>
                        <p className="message">Cette annonce n'existe pas</p>
                    </div>
                )}

            </Container>

        );
    }
}

export default withRouter(AdvertDetailAdmin);