import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import Creator from "../interfaces/Creator";

const ViewCreator: React.FC = ({ setCreators }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<Creator | null>(null);

  const deleteCreator = async () => {
    if (id) {
      const { error } = await supabase.from("creators").delete().eq("id", id);
      if (error) {
        console.error("Error deleting creator:", error);
      } else {
        if (id !== undefined) {
          setCreators((prevCreators: Creator[]) =>
            prevCreators.filter((creator) => creator.id !== Number(id))
          );
        }
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const fetchCreator = async () => {
      if (id) {
        const { data, error } = await supabase
          .from<Creator>("creators")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching creator:", error);
        } else {
          setCreator(data);
        }
      }
    };

    fetchCreator();
  }, [id]);

  if (!creator) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>View Creator</h1>
      <button
        onClick={() => {
          navigate(`/edit/${creator.id}`);
        }}
      >
        Edit
      </button>
      <button onClick={deleteCreator}>Delete</button>
      <h2>{creator.name}</h2>
      <p>URL: {creator.url}</p>
      <p>Description: {creator.description}</p>
      <p>Image URL: {creator.imageURL}</p>
    </>
  );
};

export default ViewCreator;
