import {useRoutes} from 'react-router-dom'
import './App.css'

function App() {

  const routes = useRoutes([
    // {
    //   "path": "/",
    //   "element": <Home />
    // }
  ]);

  return (
    <>
    {routes}
    </>
  )
}

export default App
