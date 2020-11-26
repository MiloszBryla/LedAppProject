import React, {useState, useEffect} from "react";
import "../../css/header-and-body.css";
import "../../css/about.css";
import "../../css/leds.css";

function LedsSun(){

    const [sunInKrakow, setSunInKrakow] = useState(false);

    var SunCalc = require('suncalc');

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

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

    const setPi1 = async (red, white) => {
        let redToSend = 0;
        let whiteToSend = white;

        await fetch(`http://192.168.1.25:5000/?red=${redToSend}&white=${whiteToSend}`);
    }

    const setPi2 = async (green, blue) => {
        let greenToSend = green;
        let blueToSend = blue;

        await fetch(`http://192.168.1.24:5000/gamma?blue=${blueToSend}&green=${greenToSend}`);
    }

    const changeSunInKrakowVariable = () => {
        console.log(sunInKrakow);
        if (sunInKrakow === true){
            setSunInKrakow(false);
        }
    }

    const sunNowButInJuneInKrakow = async () => {
        console.log(sunInKrakow);
        console.log("hello");
        setSunInKrakow(true);
        while(sunInKrakow){
            console.log(sunInKrakow);
            console.log("hello");
            let d = new Date();
            let sunPosition = SunCalc.getPosition(d, 50.05, 19,93);
            let altitudeRadians = sunPosition["altitude"];
            let percentOf90 = (100 * altitudeRadians) / (Math.PI/2);console.log("percentOf90: " + percentOf90);
            let percentOfSunHeight = (100 * percentOf90) / 70.68;
            let ledPower = 1000000 * percentOfSunHeight;
            if (ledPower > 0){
                await setPi1(ledPower/100);
            }
            sleep(2000);
        }
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
            <br/>

            <button onClick={sunNowButInJuneInKrakow}>Sun in Krakow in June now</button>
            <br/>
            <button onClick={changeSunInKrakowVariable}>End loop suninKrakow</button>

        </div>
    );
}

export default LedsSun;