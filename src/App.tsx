import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Creator from "./interfaces/Creator";
import { supabase } from "./client";
import { AddCreator, EditCreator, ShowCreators, ViewCreator } from "./pages";
import "./App.css";

const App: React.FC = () => {
  const [creators, setCreators] = useState<Creator[]>([]);

  const fetchCreatorData = async (): Promise<void> => {
    const { data, error } = await supabase.from("creators").select("*");
    if (error) {
      console.error("Error fetching creators: ", error.message);
      return;
    }
    setCreators(data);
  };

  useEffect(() => {
    fetchCreatorData();
  }, []);

  const routes = useRoutes([
    {
      path: "/",
      element: <ShowCreators creators={creators} />,
    },
    {
      path: "/new",
      element: <AddCreator setCreators={setCreators} />,
    },
    {
      path: "/edit/:id",
      element: <EditCreator setCreators={setCreators} />,
    },
    {
      path: "/view/:id",
      element: <ViewCreator />,
    },
  ]);

  return <>{routes}</>;
};

export default App;
