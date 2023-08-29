import React, { Component } from "react";
import { withRouter } from '../../Common/with-router';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import RoleService from "../../Service/RoleService";
import "../../Style/Form.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const htmlspecialchars = require('htmlspecialchars');

class UpdateRole extends Component {
    constructor(props) {
        super(props);
        this.onChangeType = this.onChangeType.bind(this);
        this.getRole = this.getRole.bind(this);
        this.updateRole = this.updateRole.bind(this);
        this.deleteRole = this.deleteRole.bind(this);

        this.state = {
            oneRole: {
                role_id: null,
                role_type: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getRole(this.props.router.params.id);
    }

    onChangeType(e) {
        const role_type = e.target.value;

        this.setState(function (prevState) {
            return {
                oneRole: {
                    ...prevState.oneRole,
                    role_type: htmlspecialchars(role_type)
                }
            };
        });
    }


    getRole(id) {
        RoleService.get(id)
            .then(response => {
                this.setState({
                    oneRole: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateRole() {
        RoleService.update(
            this.state.oneRole.role_id,
            this.state.oneRole
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

    deleteRole() {
        swal({
            title: "Vous vous supprimer ce rôle ?",
            text: "Etes vous sur de vouloir supprimer ce rôle?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    RoleService.delete(this.state.oneRole.role_id)
                    swal("Suprimé", "Le rôle a bien été supprimé", "success");
                }
            })
            .then(response => {
                this.props.router.navigate('/roles');
            })
            .catch(e => {
                console.log(e.message);
            });
    }


    render() {
        const { oneRole } = this.state;

        return (
            <Container className="view border border-secondary shadow-sm mb-5 rounded">
                <a href="/Roles" className="d-flex justify-content-start">Retour</a>
                <Row className="d-flex justify-content-center pt-5">
                    {oneRole ? (
                        <Col className="col-lg-8 col-12">
                            <h4>Role</h4>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="role_type">Nom du role</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="role_type"
                                        value={oneRole.role_type}
                                        onChange={this.onChangeType}
                                    />
                                </div>

                            </form>
                            <Button
                                type="submit"
                                className="m-2"
                                onClick={this.updateRole}
                            >
                                Valider
                            </Button>
                            <Button variant="danger"
                                className="m-2"
                                onClick={this.deleteRole}
                            >
                                Supprimer
                            </Button>
                            <p>{this.state.message}</p>
                        </Col>
                    ) : (
                        <p>Ce rôle n'existe pas </p>
                    )}
                </Row>
            </Container>
        );
    }
}

export default withRouter(UpdateRole);