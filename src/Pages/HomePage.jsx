import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import StyleService from "../Services/StyleService";

const HomePage = () => {

    const [style, setStyle] = useState([])
    const fetchStyle = async () => {
        try {
            const response = await StyleService.allStyle()
            console.log("Réponse API:", response)
            setStyle(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchStyle()
    }, [])


    return <>

        <div className="body-homepage">

            <div className="bloc-courant">
                <h1>Courants artistiques </h1>
                <ul>
                    {style.map((style) => (
                        <li key={style.id_style}>{style.style}</li>
                    ))}
                </ul>

            </div>

            <div className="bloc-principal">
                OEUVRES 
                <br />
                TABLEAUX
                <br />
                MACHIN
            </div>

        </div>

    </>


}

export default HomePage;