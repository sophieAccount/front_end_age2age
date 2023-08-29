import React, { Component } from "react";
import AdvertService from "../Service/AdvertService";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../Style/FilterAdvert.css";
import "../Style/FilterAdvert.css";

export default class FilterAdverts extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.getAdverts = this.getAdverts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveAdvert = this.setActiveAdvert.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            tutorials: [],
            currentAdvert: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.getAdverts();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    getAdverts() {
        AdvertService.getAll()
            .then(response => {
                this.setState({
                    adverts: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.getAdverts();
        this.setState({
            currentAdvert: null,
            currentIndex: -1
        });
    }

    setActiveAdvert(advert, index) {
        this.setState({
            currentAdvert: advert,
            currentIndex: index
        });
    }


    searchTitle() {
        this.setState({
            currentAdvert: null,
            currentIndex: -1
        });
        AdvertService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    adverts: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, adverts, currentAdvert, currentIndex } = this.state;
        console.log(adverts);
        return (
            <Container className="Home">
                <Row className="searchBar rounded shadow-sm p-3">
                    <Col className=" col-lg-8 col-12">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Rechercher par titre"
                                value={searchTitle}
                                onChange={this.onChangeSearchTitle}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary bg-white"
                                    type="button"
                                    onClick={this.searchTitle}
                                >
                                    Rechercher
                                    <span class="material-icons-outlined">search</span>
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Container className="flex">

                    {adverts &&
                        adverts.map((advert, index) => (
                            <>
                                {!advert.advert_selected && advert.advert_active ? (
                                    <Row className="m-2 advertOne">
                                        <Card className="card col-12 col-lg-6 cardAdvert shadow-sm">
                                            <Card.Body>
                                                <Card.Title>{advert.advert_title}</Card.Title>
                                                <Card.Text>
                                                    {advert.advert_description}
                                                </Card.Text>
                                                <Link className="btn buttonColor" to={`/AdvertDetails/${advert.advert_id}`}
                                                >Détails
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </Row>

                                ) : (
                                    null
                                )}
                            </>

                        ))}
                </Container>
            </Container>
        );
    }
}