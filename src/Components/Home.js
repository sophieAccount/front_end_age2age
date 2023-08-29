import React, { useState, useEffect } from "react";
import "../Style/Home.css";
import Advert from './Advert/Advert';
import FilterAdverts from "./FilterAdverts";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../image/logo.png';
import { useAuthContext } from "../Context/AuthProvider";

function Home() {
    const [data, setAdvert] = useState([]);
    const { config } = useAuthContext();

    useEffect(() => {
        fetch(`https://${config}/adverts`)
            .then((res) => res.json())
            .then((resData) => setAdvert(resData));
    }, []);

    const myAdverts = data.map(data => {
        return <Advert key={data.advert_id} data={data} />
    });
    return (
        <>
            <Container >
                <div className="head">
                    <h1 className="age2age">Age2Age</h1>
                    <img src={logo} alt="logo"/>
                </div>
                <p className="Bienvenu">Bienvenue sur Age2Age ! Vous avez des difficultés à éffectuer certaines tâches du quotidien ? Ne vous inquitez pas, notre site est là pour vous aider. Poster votre demande de service et un citoyen y répondra !</p>
                <FilterAdverts />
            </Container>

        </>
    )
}

export default Home