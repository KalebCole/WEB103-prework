import React from "react";
import Creator from "../interfaces/Creator";
import CreatorCard from "../components/CreatorCard";

interface ShowCreatorsProps {
  creators: Creator[];
}

const ShowCreators: React.FC<ShowCreatorsProps> = ({ creators }) => {
  return (
    <>
      <h1> Show Creators </h1>
      {creators && creators.length > 0 ? (
        creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))
      ) : (
        <h2> No creators yet</h2>
      )}
    </>
  );
};

export default ShowCreators;
