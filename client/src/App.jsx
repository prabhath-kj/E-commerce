import {Outlet} from "react-router-dom"
import Navbar from "./components/common/NavBar"

const App =()=> {
  return (
   <>
   <Navbar/>
   <Outlet/>
   </>
  )
}

export default App