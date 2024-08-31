import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import Creator from "../interfaces/Creator";

interface ViewCreatorProps {
  setCreators: React.Dispatch<React.SetStateAction<Creator[]>>;
}

const ViewCreator: React.FC<ViewCreatorProps> = ({ setCreators }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<Creator | null>(null);

  useEffect(() => {
    const fetchCreator = async () => {
      if (id) {
        const { data, error } = await supabase
          .from("creators")
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

  const handleDelete = async () => {
    if (id) {
      const { error } = await supabase.from("creators").delete().eq("id", id);

      if (error) {
        console.error("Error deleting creator:", error);
      } else {
        setCreators((prevCreators) =>
          prevCreators.filter((creator) => creator.id !== Number(id))
        );
        navigate("/");
      }
    }
  };

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
      <button onClick={handleDelete}>Delete</button>
      <h2>{creator.name}</h2>
      {/* Add more creator information here */}
    </>
  );
};

export default ViewCreator;
