import { useState } from "react";
import { supabase } from "../client";
import Creator from "../interfaces/Creator";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddCreator() {
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!(name.length > 0 && url.length > 0)) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("creators")
      .insert([{ name, url, description, imageURL }]);

      if (error) {
        console.error("Error adding creator:", error);
        setFormError("Please fill in all the fields correctly");
      } else {
        if (data) {
          console.log("Creator added successfully:", data);
        } else {
          console.log("No data returned from the insert operation");
        }
        setFormError("");
      }
  };

  return (
    <>
      <h1> Add Creator </h1>
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
        <button>Add a creator</button>
        {formError.length > 0 && <p>{formError}</p>}
      </form>
    </>
  );
}
