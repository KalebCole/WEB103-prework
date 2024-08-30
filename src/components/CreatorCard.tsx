import React from "react";
import { useNavigate } from "react-router-dom"; 
import Creator from "../interfaces/Creator";

interface CreatorCardProps {
    creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // i could create a context and update it, but it's easier to refetch
        navigate(`/view/${creator.id}`);
    };

    return (
        <div className="creator-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <h1> Creator Card </h1>
            <p>Name: {creator.name}</p>
            <p>URL: {creator.url}</p>
            <p>description: {creator.description}</p>
            <p>imageURL: {creator.imageURL}</p>
        </div>
    );
};

export default CreatorCard;
