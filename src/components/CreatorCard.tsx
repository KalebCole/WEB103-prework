import React from "react";
import { useNavigate } from "react-router-dom";
import Creator from "../interfaces/Creator";

interface CreatorCardProps {
  creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const navigate = useNavigate();

  return (
    <div className="creator-card" style={{ cursor: "pointer" }}>
      <h1> Creator Card </h1>
      {/* i icon to edit the creator */}
      <button
        onClick={() => {
          navigate(`/edit/${creator.id}`);
        }}
      >
        Edit
      </button>
      <p onClick={() => { navigate(`/view/${creator.id}`);}}>Name: {creator.name}</p>
      <p>URL: {creator.url}</p>
      <p>description: {creator.description}</p>
      <p>imageURL: {creator.imageURL}</p>
    </div>
  );
};

export default CreatorCard;
