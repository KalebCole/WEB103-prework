import {useRoutes} from 'react-router-dom'
import Creator from './interfaces/Creator';
import { AddCreator, EditCreator, ViewCreator, ShowCreators } from './pages';
import {supabase} from "./client"
import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [creators, setCreators] = useState<Creator[]>([]);


  const routes = useRoutes([
    {
      "path": "/",
      "element": <ShowCreators creators={creators}/>
    },
    {
      "path": "/new",
      "element": <AddCreator />
    },
    {
      "path": "/edit/:id",
      "element": <EditCreator />
    },
    {
      "path": "/view/:id",
      "element": <ViewCreator />
    }
  ]);

  const fetchCreatorData = async (): Promise<Creator[]> => {
      const {data, error} = await supabase.from("creators").select("*");
      if (error){
        console.error("Error fetching visits: ", error.message);
        throw error;
      }
      return data;
  }

  useEffect(() => {
    fetchCreatorData().then(setCreators).catch(console.error);
  }, []);

  return (
    <>
    {routes}
    </>
  )
}

export default App
