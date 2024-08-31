import React from "react";
import { useNavigate } from "react-router-dom";
import Creator from "../interfaces/Creator";
import "./CreatorCard.css";

interface CreatorCardProps {
  creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <img className="card-image" src={creator.imageURL} alt={creator.name} />
      <div className="card-content">
        <h2>{creator.name}</h2>
        <p>URL: {creator.url}</p>
        <p>Description: {creator.description}</p>
        <div className="button-container">
          <button
            onClick={() => {
              navigate(`/edit/${creator.id}`);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              navigate(`/view/${creator.id}`);
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
