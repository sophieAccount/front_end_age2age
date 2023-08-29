import React, { } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../Style/NavigationBar.css";
import { FaHome, FaBuffer, FaSignOutAlt, FaRegUserCircle, FaPage4 } from 'react-icons/fa';
import 'material-icons/iconfont/material-icons.css';
import img from "../image/logo.png";

function NavigationBar(props) {

  //  const [token, setToken] = useState(localStorage.getItem("auth"));

  let token = localStorage.getItem("auth");
  let userId = localStorage.getItem("userId");
  function logout() {
    token = localStorage.getItem("auth") ? localStorage.removeItem("auth") : '';
    userId = localStorage.getItem("userId") ? localStorage.removeItem("userId") : '';
  }

  return (
    <>
      {
        !token ?
          <Navbar expand="lg">
            <Navbar.Brand href="/">
              <img src={img} alt="logo" className="logo" />
            </Navbar.Brand>
            <Navbar.Collapse className="d-flex justify-content-between nav d-flex" id="basic-navbar-nav">
              <Nav className="ml-auto d-flex">
                <Nav.Link className="d-flex" href="/" exact>
                  <p className="textNavBar">Accueil    <icon><FaHome /></icon></p>
                </Nav.Link>
                <Nav.Link className="d-flex" href="/AllCategories" >
                  <p className="textNavBar">Catégories<span class="material-icons-outlined">library_books</span></p>
                </Nav.Link>

                <Nav.Link className="d-flex" href="/inscription">
                  <p className="textNavBar">Inscription   <icon><FaBuffer /></icon></p>
                </Nav.Link>
              </Nav >
            </Navbar.Collapse >
            <Navbar.Collapse id="basic-navbar-nav" className="divConnect">
              <Nav className="ml-auto">
                <Nav.Link className="d-flex" href="/Connexion">
                  <p className="textNavBar">Connexion<span class="material-icons-outlined">login</span>  </p>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse >
          </Navbar >

          :
          <Navbar expand="lg" id="conteinerNavbar">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Navbar.Brand href="/">
                  <img src={img} alt="logo" className="logo" />

                </Navbar.Brand>
                <Nav.Link className="d-flex" href="/" exact>
                  <p className="textNavBar">Accueil       <icon><FaHome /></icon></p>
                </Nav.Link>
                <Nav.Link className="d-flex" href="/AllCategories" >
                  <p className="textNavBar">Catégories<span class="material-icons-outlined">library_books</span></p>
                </Nav.Link>
                <Nav.Link className="d-flex" href="/admin" >
                  <p className="textNavBar">Admin <span class="material-icons-outlined">settings</span></p>
                </Nav.Link>
              </Nav >
            </Navbar.Collapse >
            <Navbar.Collapse id="basic-navbar-nav" className="divConnect">
              <Nav className="ml-auto">
              <Nav.Link
                  className="d-flex connexion"
                  href="/Connexion" onClick={() => {
                    logout();
                  }}>

                  <p className="textNavBar">Déconnexion   <icon><FaSignOutAlt /></icon></p>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse >
          </Navbar >
      }
    </>
  );
}

export default NavigationBar