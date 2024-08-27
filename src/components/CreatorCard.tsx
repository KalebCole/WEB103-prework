import React from "react";
import Creator from "../interfaces/Creator"

interface CreatorCardProps{
    creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
    return (
        <div className="creator-card">
            <h1> Creator Card </h1>
            <p>Name: {creator.name}</p>
            <p>URL: {creator.url}</p>
            <p>description: {creator.description}</p>
            <p>imageURL: {creator.imageURL}</p>
        </div>
    );
}

export default CreatorCard;