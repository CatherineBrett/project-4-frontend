import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import GroupsList from "./components/GroupsList"
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn"
import AddGroup from "./components/AddGroup"
import ShowOneGroup from "./components/ShowOneGroup"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groups" element={<GroupsList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/add-group" element={<AddGroup />} />
        <Route path="/groups/:groupId" element={<ShowOneGroup />} />
      </Routes>
    </Router>
  )  
}

export default App
