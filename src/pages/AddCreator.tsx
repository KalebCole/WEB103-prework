import { useState } from "react";
import { supabase } from "../client";
import Creator from "../interfaces/Creator";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddCreator() {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      const newCreator: Omit<Creator, "id"> = {
        name,
        url,
        description,
        imageURL,
      };

      const { data, error } = await supabase
        .from("creators")
        .insert([newCreator]);

      if (error) {
        console.error("Error adding creator:", error.message);
      } else {
        console.log("Creator added successfully:", data);
        
      }
    };
    return (
      <>
        <h1> Add Creator </h1>
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="url">URL:</label>
            <input type="text" id="url" name="url" />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description"></textarea>
          </div>
          <div>
            <label htmlFor="imageURL">Image URL:</label>
            <input type="text" id="imageURL" name="imageURL" />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </>
    );
}
