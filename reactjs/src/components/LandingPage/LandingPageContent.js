import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import "../../css/header-and-body.css";
import "../../css/index.css";
import logo from "../../assets/logo-with-slogan.svg"
import scrollDownArrows from "../../assets/scroll-down-arrows.svg"
import cameraJpg from "../../assets/camera.jpg"
import homeEquipmentJpg from "../../assets/home-equipment.jpg"
import adventureJpg from "../../assets/adventure.jpg"
import scooterJpg from "../../assets/scooter.jpg"
import instrumentsJpg from "../../assets/instruments.png"
import Header from "../Header/Header"
import Notifications from "./index";
import styled from 'styled-components';
import Cookies from "js-cookie";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";

const Container = styled.div`

    `;

function LandingPageContent() {

    const history = useHistory();
    let [phrase, setPhrase] = useState();

    const redirect = () => {
        history.replace("/items-list/" + phrase);
    }

    function authorizeListItemAccess(){
        let token = Cookies.get("Authorization");
        if(token !== undefined) {
            let tokenExpiration = jwt_decode(token).exp;
            let dateNow = new Date();
            if (tokenExpiration > dateNow.getTime() / 1000) {
                history.push("/item");
            }
        }
        else{
            lightUpLoginOptions();
        }
    }

    function lightUpLoginOptions(){
        document.getElementById("account-buttons").animate([
            {boxShadow: 'none'},
            {boxShadow: "0px 0px 20px 15px rgba(255,231,0, 1)"},
            {boxShadow: 'none'},
            {boxShadow: "0px 0px 20px 15px rgba(255,231,0, 1)"},
            {boxShadow: 'none'},
        ], {
            duration: 1600,
        })
    };


    function handleChange(event) {
        setPhrase(event.target.value);
    }

    function animateArrows() {
        document.getElementById("scroll-down-arrows").animate([
            {transform: 'translateY(-10px)'},
            {transform: 'translateY(0px)'},
            {transform: 'translateY(-10px)'},
        ], {
            duration: 2000,
            iterations: Infinity
        })
    };

    return (
        <div>
            <div className="landing-page-header">
                <Header />
            </div>
            <div className="area-of-logo-with-options">
                <img alt="#" id="logo-with-slogan" src={logo}/>
                <div id="options">
                    <form id="search-form" onSubmit={redirect}>
                        <input type="text" id="search-field"
                        onChange={handleChange}
                        placeholder="browse items..."/>

                    </form>
                    <p className="or">or</p>
                    <button id="list-item-button" onClick={authorizeListItemAccess}>LIST ITEM</button>
                </div>
                <Container><Notifications /></Container>
            </div>

            <div id="see-categories-sign" onLoad={animateArrows}  >
                <a href="#categories-area"><p id="see-categories">see categories</p>
                <img id="scroll-down-arrows" src={scrollDownArrows}/></a>
            </div>

            <div id="categories-area">
                <div className="categories">
                <NavLink to={"/items-list/category: cameras"}>
                    <div className="category">
                        <div className="category-image-container">
                            <img className="category-image" src={cameraJpg}/>
                        </div>
                        <div className="category-name">
                            CAMERAS
                        </div>
                    </div>
                </NavLink>
                <NavLink to={"/items-list/category: home equipment"}>
                    <div className="category">
                        <div className="category-image-container">
                            <a href="#"><img className="category-image" src={homeEquipmentJpg}/></a>
                        </div>
                        <div className="category-name">
                            HOME EQUIPMENT
                        </div>
                    </div>
                </NavLink>
                <NavLink to={"/items-list/category: adventure"}>
                    <div className="category">
                        <div className="category-image-container">
                            <a href="#"> <img className="category-image" src={adventureJpg}/></a>
                        </div>
                        <div className="category-name">
                            ADVENTURE
                        </div>
                    </div>
                </NavLink>
                <NavLink to={"/items-list/category: scooters"}>
                    <div className="category">
                        <div className="category-image-container">
                            <a href="#">   <img className="category-image" src={scooterJpg}/></a>
                        </div>
                        <div className="category-name">
                            SCOOTERS
                        </div>
                    </div>
                </NavLink>
                <NavLink to={"/items-list/category: instruments"}>
                    <div className="category">
                        <div className="category-image-container">
                            <a href="#">  <img className="category-image" src={instrumentsJpg}/></a>
                        </div>
                        <div className="category-name">
                            INSTRUMENTS
                        </div>
                    </div>
                </NavLink>
                </div>
            </div>
        </div>
    );
}

export default LandingPageContent;