import React, {useState, useEffect} from "react";
import "../../css/header-and-body.css";
import "../../css/about.css";
import "../../css/leds.css";

function Leds(){

     const setLeds = async () => {
         setLeds1();
         setLeds2();

    }

    const setLeds1 = async () => {
        let red = document.getElementById("red").value;
        let white = document.getElementById("white").value;

        await fetch(`http://192.168.1.25:5000/?red=${red}&white=${white}`);
    }

    const setLeds2 = async () => {
        let green = document.getElementById("green").value;
        let blue = document.getElementById("blue").value;

        await fetch(`http://192.168.1.24:5000/gamma?blue=${blue}&green=${green}`);
    }


    return (
        <div className={"ledSlidersArea"}>
            <p>RED:</p>
            <input type="range" min="0" max="1000000" id="red" className={"slider"} onChange={setLeds}/>
            <br/>

            <p>GREEN:</p>
            <input type="range" min="0" max="1000000" id="green" className={"slider"} onChange={setLeds}/>
            <br/>

            <p>BLUE:</p>
            <input type="range" min="0" max="1000000" id="blue" className={"slider"} onChange={setLeds}/>
            <br/>

            <p>WHITE:</p>
            <input type="range" min="0" max="1000000" id="white" className={"slider"} onChange={setLeds}/>
            <br/>
        </div>
    );
}

export default Leds;