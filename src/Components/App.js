import React, { useState, useEffect } from "react";
import "../Style/App.css";
import NavigationBar from '../Components/NavigationBar';
import AllRoutes from "../Routes/AllRoutes";
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Footer from '../Components/Footer';

function App() {
  return (

    <div className="App ">
      <NavigationBar />
      <Container className=" mx-auto  mt-5">
        <Router>
          <AllRoutes />
        </Router>
      </Container>
      <Footer />
    </div>
  );
}
export default App