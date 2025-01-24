import config from "../config/url";
import Card from "react-bootstrap/Card";
import React from "react";

function ArtworkCard({ artwork, onClick }) {
    return (
        <Card
            className="card"
            onClick={onClick}
            style={{ cursor: "pointer" }}>
            <Card.Img
                className="card-img"
                src={config.url + "/images/" + artwork.image_url}
                alt={artwork.title}
            />
            <Card.Body>
                <Card.Text className="card-title">
                    {artwork.title}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ArtworkCard;

