import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {supabase} from "../client"
import Creator from "../interfaces/Creator";



export default function ViewCreator(){
    const { id } = useParams();
    const [creator, setCreator] = useState<Creator>(null);

    const fetchCreatorDataById = async () => {
        const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
        if (error){
          console.error("Error fetching single creator: ", error.message);
          throw error;
        }
        setCreator(data)
    }

    useEffect(() => {
        fetchCreatorDataById();
    }, [id]);

    return (
        <>
        <h1> View Creator </h1>
        <h2>{creator.name}</h2>

        </>
    )
}