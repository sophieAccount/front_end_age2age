import React, { Component } from "react";
import RoleService from "../../Service/RoleService";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { AuthContext, useAuthContext } from "../../Context/AuthProvider";
import "../../Style/RoleList.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const htmlspecialchars = require('htmlspecialchars');

export default class AddRole extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);

        this.onChangeType = this.onChangeType.bind(this);
        this.saveRole = this.saveRole.bind(this);
        this.newRole = this.newRole.bind(this);

        this.state = {
            role_id: null,
            role_type: "",

            submitted: false
        };
    }

    onChangeType(e) {
        this.setState({
            role_type: e.target.value
        });
    }



    saveRole() {
        var data = {
            role_type: this.state.role_type,
        };

        RoleService.create(data)
            .then(response => {
                this.setState({
                    role_id: response.data.role_id,
                    role_type: htmlspecialchars(response.data.role_type),

                    submitted: true
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    newRole() {
        this.setState({
            role_id: null,
            role_type: "",

            submitted: false
        });
    }

    render() {
        const value = this.context


        return (
            <Container className="view border border-secondary shadow-sm mb-5 rounded">

                <a href="/Roles" className="d-flex justify-content-start">Retour</a>
                <Row className="d-flex justify-content-center pt-5">
                    <h5>Ajouter un nouveau rôle d'utilisateur</h5>
                    {this.state.submitted ? (

                        <h4>Le rôle a bien été créé</h4>

                    ) : (
                        <Col className="col-lg-8 col-12">
                            <div className="d-flex flex-column mb-3">
                                <label htmlFor="role_type">Nom du role</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    role_id="role_type"
                                    required
                                    value={this.state.role_type}
                                    onChange={this.onChangeType}
                                    name="role_type"
                                />
                            </div>



                            <Button onClick={this.saveRole} className="btn btn-success">
                                Ajouter
                            </Button>
                        </Col>
                    )}

                </Row>

            </Container>
        );
    }
}