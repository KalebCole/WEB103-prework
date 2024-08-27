import {useRoutes} from 'react-router-dom'
import { AddCreator, EditCreator, ViewCreator, ShowCreators } from './pages';
import './App.css'

function App() {

  const routes = useRoutes([
    {
      "path": "/",
      "element": <ShowCreators />
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

  return (
    <>
    {routes}
    </>
  )
}

export default App
