import React, { useState, useEffect, useContext } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { AuthContext } from "../Context/AuthProvider";
import { FaHome, FaUser, FaPlusSquare, FaBuffer, FaSignOutAlt } from 'react-icons/fa';
import { Navigate, Routes, Route } from 'react-router-dom';
import "../Style/Footer.css";



function Footer(props) {

  return (
    <>
      <div className="footer d-flex flex-wrap justify-content-evenly mt-auto py-3">
        <div className="cat">
          <p>© 2023 Age2Age</p>
        </div>
        <div className="cat">
          <p>Conditions générales d'utilisation</p>
        </div>
        <div className="cat">
          <p>Politique de confidentialité</p>
        </div>
        <div className="cat">
          <p>Contact</p>
        </div>
      </div>
    </>
  );
}

export default Footer