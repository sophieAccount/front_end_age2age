import React, { Component } from "react";
import AdvertService from "../../Service/AdvertService";
import UserHasFavouriteService from "../../Service/UserHasFavouriteService";
import { withRouter } from '../../Common/with-router';
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import "../../Style/AdvertDetail.css";
import Bouton from "../Bouton";
import CategoriesService from "../../Service/CategoriesService";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddComment from "../Comments/AddComment";
import dayjs from 'dayjs'
import Table from 'react-bootstrap/Table';
import CommentService from "../../Service/CommentService";


class AdvertDetails extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.getAdvert = this.getAdvert.bind(this);
        this.updateAdvert = this.updateAdvert.bind(this);
        this.userFavourite = this.userFavourite.bind(this);
        this.deleteFavourite = this.deleteFavourite.bind(this);
        this.updateAdvertSelected = this.updateAdvertSelected.bind(this);
        this.getCommentReceive = this.getCommentReceive.bind(this)
        this.getCategories = this.getCategories.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCategories = this.setActiveCategories.bind(this);

        this.state = {
            oneAdvert: {
                advert_id: null,
                advert_description: "",
                advert_active: false,
                advert_archive: false,
                updatedAt: new Date,
                user_id_select: '',
                user_id_create: null,
                isFavourite: false,
                category_id: null,
            },
            commentReceive: [],
            commentReceive: [],
            message: "",
            categories: [],
            currentcategory: null,
            user: this.contextType,

        };
    }

    componentDidMount() {
        this.getAdvert(this.props.router.params.id);
        this.getCategories();
        // this.getCommentReceive(this.state.oneAdvert.user_id_create)
    }

    userFavourite() {
        var data = {
            user_id: this.context.userData[0].user_id,
            advert_id: this.state.oneAdvert.advert_id,
            isFavourite: true,
        };
        UserHasFavouriteService.create(data)
            .then(response => {
                this.setState({
                    user_id: this.context.userData[0].user_id,
                    advert_id: response.data.advert_id,
                    isFavourite: true,
                    submitted: true,
                    message: "Cette annonce a bien été ajoutée à vos favoris"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    deleteFavourite() {
        UserHasFavouriteService.delete(this.state.oneAdvert.advert_id,)
            .then(response => {
                this.setState({
                    isFavourite: false,
                    message: "Cette annonce a bien été retirée de vos favoris"
                })
            })
            .catch(e => {
                console.log(e);
            });
    }

    getAdvert(id) {
        AdvertService.get(id)
            .then(response => {
                this.setState({
                    oneAdvert: response.data
                });
                this.getCommentReceive(this.state.oneAdvert.user_id_create)

            })
            .catch(e => {
                console.log(e);
            });
    }

    updateAdvertSelected(select) {
        var data = {
            advert_id: this.state.oneAdvert.advert_id,
            advert_description: this.state.oneAdvert.advert_description,
            advert_selected: select,
            user_id_select: this.context.userData[0].user_id,
            updatedAt: new Date(),
            category_id: this.state.oneAdvert.category_id,
            user_id_create: this.state.oneAdvert.user_id_create,
        };

        AdvertService.update(this.state.oneAdvert.advert_id, data)
            .then(response => {
                this.setState(prevState => ({
                    oneAdvert: {
                        ...prevState.oneAdvert,
                        advert_selected: select,
                        user_id_select: this.context.userData[0].user_id,
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

    getCommentReceive(user_id_create) {

        CommentService.getCommentReceive(user_id_create)
            .then(response => {
                this.setState({
                    commentReceive: response.data,


                });
                console.log(response.data)
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
        const { oneAdvert, categories, commentReceive } = this.state;
        const value = this.context
        var categoriesText = "";
        categories.map((category) => {
            if (category.category_id == oneAdvert.category_id) {
                categoriesText = category.category_type;
            }
        });
        const token = localStorage.getItem("userId");


        console.log(commentReceive)

        return (
            <Container className="shadow-sm my-5 border border-secondary rounded">

                {oneAdvert ? (
                    <Row className="edit-form">
                        <h1>
                            {oneAdvert.advert_title}
                        </h1>
                        <div className="OneAdvert">
                            <div class="entete">
                                <div class="user mid">
                                    {/* <h5>Annonce postée par</h5> */}
                                    <h5>
                                        Catégorie : {categoriesText}
                                    </h5>
                                </div>
                            </div>
                            <Row className="py-5" class="contenu">
                                <Col className="col-lg-6 col-12" class="mid image" >
                                    <img src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image de l'annonce" />
                                </Col>
                                <Col className="col-lg-6 col-12" class="mid infos">
                                    <p>Description : {oneAdvert.advert_description}</p>
                                    <p class="min">Adresse : {oneAdvert.advert_address} </p>
                                    <p>{oneAdvert.advert_zip_code} {oneAdvert.advert_city}</p>
                                    <p class="min">Créé le {dayjs(oneAdvert.createAt).format("DD/MM/YYYY")}</p>
                                    {token ? (<div>
                                        <Bouton text={"Mettre en favoris"} onClick={() => this.userFavourite(true)}>
                                        </Bouton>
                                        <Bouton 
                                        text={"Retirer des favoris"} onClick={() => this.deleteFavourite(true)}>
                                        </Bouton>
                                        <p>{this.state.message}</p>
                                        {oneAdvert.advert_selected ? (
                                            <>
                                                <Bouton 
                                                text={"Ne plus participer"} onClick={() => this.updateAdvertSelected(false)}>
                                                </Bouton>
                                                <AddComment selected={oneAdvert.user_id_create} />
                                            </>
                                        ) : (
                                            <Bouton text={"Selectionner"} onClick={() => this.updateAdvertSelected(true)}>
                                            </Bouton>
                                        )}

                                       
                                        {oneAdvert.user_id_create === token ?
                                            <Link to={`/modifyAdvert/${oneAdvert.advert_id}`}>
                                                <div className="element btn btn-success">
                                                    Modifier mon annonce
                                                </div>
                                            </Link>
                                            :
                                            null}
                                    </div>) : (null)}

                                </Col>
                            </Row>
                            <Row>
                                {token ? (<div>

                                    {oneAdvert ? (
                                        <Row className="d-flex justify-content-center mb-5">
                                            <Row className="categories shadow-sm rounded py-2 mb-2 mt-4">
                                                <h3 className="text-center">Commentaires</h3>
                                            </Row>
                                            <Col className="col-12">
                                                <Table striped bordered hover id="myTable" className="Commentreceive">


                                                    {commentReceive.map((comment, index) => (
                                                        comment.comment_active ? (
                                                            <>
                                                                <div>
                                                                    <p>
                                                                        <strong>{comment.user_pseudo}</strong> <span className="note">{comment.comment_rating}⭐</span>
                                                                    </p>
                                                                    <p>
                                                                        {comment.comment_description}
                                                                    </p>

                                                                </div>
                                                                <hr />
                                                            </>
                                                        ) : (
                                                            null
                                                        )

                                                    ))}

                                                </Table>
                                            </Col>
                                        </Row>
                                    ) : (
                                        null
                                    )}
                                </div>) : (null)}
                            </Row>
                        </div>
                    </Row>

                ) : (
                    <div>
                        <p>Cette annonce n'existe pas</p>
                    </div>
                )}
            </Container>
        );




    }
}

export default withRouter(AdvertDetails);