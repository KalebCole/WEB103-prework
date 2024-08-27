// ShowCreators.tsx
import React from 'react';
import Creator from '../interfaces/Creator';

interface ShowCreatorsProps {
  creators: Creator[];
}

const ShowCreators: React.FC<ShowCreatorsProps> = ({ creators }) => {
  return (
    <>
    <h1> Show Creators </h1>
      {creators && creators.length > 0 ? creators.map(creator => (
        <div key={creator.id}>
          <h2>{creator.name}</h2>
          <p>{creator.description}</p>
        </div>
      )) : 
      <h2> No creators yet</h2> 
    }
    </>
  );
}

export default ShowCreators;