import React, { Component } from "react";
import RoleService from "../../Service/RoleService";
import { Link } from "react-router-dom";
import { withRouter } from '../../Common/with-router';
import Button from 'react-bootstrap/Button';
import "../../Style/RoleList.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class OneRole extends Component {
    constructor(props) {
        super(props);
        this.getRole = this.getRole.bind(this);

        this.state = {
            currentTutorial: {
                role_id: null,
                role_type: "",
            },
            message: ""
        };

    }

    componentDidMount() {
        this.getRole(this.props.router.params.id);
    }

    getRole(id) {
        RoleService.get(id)
            .then(response => {
                this.setState({
                    onerole: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });

    }


    render() {
        const { onerole } = this.state;

        return (
            <Container className="view border border-secondary shadow-sm mb-5 rounded">

                <a href="/Admin" className="d-flex justify-content-start">Retour</a>
                <Row className="d-flex justify-content-center">
                    {onerole ? (
                        <Col className="col-12">

                            <h1> {onerole.role_type}</h1>

                        </Col>
                    ) : (
                        null
                    )}
                </Row>

            </Container>
        );
    }
}


export default withRouter(OneRole);