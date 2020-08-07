import React, { useEffect, useState } from 'react';
import Logoimg from '../../assets/images/logo.svg'
import landingimg from '../../assets/images/landing.svg'
import studyicon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import Api from '../../Services/api'
import {Link} from 'react-router-dom';
import './styles.css'


function Landing() {
    const [connection, setConnection] = useState(0);
    useEffect(() => {
        Api.get('connections').then(res => {
            setConnection(res.data.total)
        });
    }, [])
    
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={Logoimg} alt="proffy logo" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                <img src={landingimg} alt="plataforma de estudos" className="hero-image" />
                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyicon} alt="Estudar"/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Estudar"/>
                        Dar aulas
                    </Link>
                </div>
            <span className="total-connections">
                Total de {connection} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
            </span>

            </div>
        </div>
    )
}

export default Landing;