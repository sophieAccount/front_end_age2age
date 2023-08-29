import React, {  } from "react";
import "../Style/Bouton.css";

function Bouton ({ text, onClick }) {
  return (
    <button className="boutonAppli" onClick={onClick}>{text}</button>
  );
};

export default Bouton;