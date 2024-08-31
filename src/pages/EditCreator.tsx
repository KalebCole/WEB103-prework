import { useEffect, useState } from "react";
import { supabase } from "../client";
import Creator from "../interfaces/Creator";
import { useNavigate, useParams } from "react-router-dom";

interface AddCreatorProps {
  setCreators: React.Dispatch<React.SetStateAction<Creator[]>>;
}

const EditCreator: React.FC<AddCreatorProps> = ({ setCreators }) => {
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCreatorDataById = async () => {
    const { data, error } = await supabase
      .from("creators")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching single creator: ", error.message);
      throw error;
    }
    if (data) {
      setName(data.name);
      setUrl(data.url);
      setDescription(data.description);
      setImageURL(data.imageURL);
    }
  };

  useEffect(() => {
    fetchCreatorDataById();
  }, [id, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!(name.length > 0 && url.length > 0)) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("creators")
      .update({ name, url, description, imageURL })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error adding creator:", error);
      setFormError("Please fill in all the fields correctly");
    } else {
      if (data && id !== undefined) {
        console.log("Creator added successfully:", data);
        setFormError("");
        setCreators((prevCreators) =>
          prevCreators.map((creator) =>
            creator.id === Number(id) ? { ...creator, ...data[0] } : creator
          )
        );
        navigate("/");
      } else {
        console.log("No data returned from the insert operation");
      }
    }
  };
  return (
    <>
      <h1>Edit Creator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="imageURL">Image URL:</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <button>Edit creator</button>
        {formError.length > 0 && <p>{formError}</p>}
      </form>
    </>
  );
};

export default EditCreator;
