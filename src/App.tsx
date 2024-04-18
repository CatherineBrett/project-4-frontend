import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import GroupsList from "./components/GroupsList"
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn"
import AddGroup from "./components/AddGroup"
import ShowOneGroup from "./components/ShowOneGroup"
import { useEffect, useState } from "react"
import axios from "axios"


function App() {

  const [user, setUser] = useState(null)

  console.log(user)

  async function fetchUser() {
    const token = localStorage.getItem("token")
    const resp = await axios.get("/api/user", {
      headers: { Authorization: `Bearer ${token}` }
    })
    setUser(resp.data)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(token)
    if (token) fetchUser()
  }, [])

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groups" element={<GroupsList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn fetchUser={fetchUser} />} />
        <Route path="/add-group" element={<AddGroup />} />
        <Route path="/groups/:groupId" element={<ShowOneGroup user={user}/>} />
      </Routes>
    </Router>
  )  
}

export default App
