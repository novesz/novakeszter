import React from "react";
import dzsek from "./assets/dzsek.jpg"
import './Reg.css'


function Reg(){

    return(
        <div>
            <h1>Registration</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ducimus ipsum vitae animi culpa earum ea qui incidunt voluptas voluptatem quos laborum consectetur repellendus optio reiciendis, eum modi quo molestias?</p>
            <img src={dzsek} alt="dzsek" className="dkep" />
            <a href="/"><button className="reg-btn">Registrate here</button></a>
            
        </div>


    );
}

export default Reg