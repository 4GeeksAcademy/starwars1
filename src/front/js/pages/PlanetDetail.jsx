import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const PlanetDetail = () => {
    const [detail, setDetail] = useState(null)
    
    const { store } = useContext(Context)
    const { theid } = useParams()
    
    const findPlanet = () => {
        const planet = store.planets.find((item) => item._id == theid)
        setDetail(planet)
    }
    
    useEffect(() => {
        findPlanet()
    }, [])
    
    return (
        <div className="container">
            <h1>Planet Details: {detail?.properties?.name}</h1>
        </div>
    )
}

export default PlanetDetail;