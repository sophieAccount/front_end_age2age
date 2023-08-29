import React, { Component } from "react";
import RoleService from "../../Service/RoleService";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../Common/with-router';
import "../../Style/RoleList.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class RoleList extends Component {
    constructor(props) {
        super(props);

        this.gerRoleList = this.gerRoleList.bind(this);
        this.refreshList = this.refreshList.bind(this);


        this.state = {
            roles: [],
            currentRole: null,
            // currentIndex: 0,
        };
    }

    componentDidMount() {
        this.gerRoleList();
    }

    gerRoleList() {
        RoleService.getAll()
            .then(response => {
                this.setState({
                    roles: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.gerRoleList();
        this.setState({
            roles: null,
            // roles: 0
        });
    }

    setActiveroles(roles, index) {
        this.setState({
            roles: roles,
            // currentIndex: index
        });
    }

    render() {
        const { roles } = this.state;

        return (
            <Container className="Home" >
                <a href="/Admin" className="d-flex justify-content-start">Retour</a>
                <Row className="categories shadow-sm rounded py-2 mb-5 mt-2">
                    <h3 className="text-center">Liste des rôles</h3>
                </Row>
                <Row className="d-flex justify-content-center">
                    <div className="table-responsive">

                        <Table striped bordered hover >

                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Modifier</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles &&
                                    roles.map((role, index) => (
                                        <tr>
                                            <td>
                                                {role.role_type}
                                            </td>
                                            <td>
                                                <Link

                                                    to={"/UpdateRole/" + role.role_id}
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

            </Container>

        );
    }
}

export default withRouter(RoleList);