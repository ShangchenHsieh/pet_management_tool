import {React, useContext, useEffect} from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact"
import About from "./components/About"
import QA from "./components/QA"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { UserContext } from "./context/UserContext";
import Header from "./components/user_components/Header";

function App() {
  const [token,] = useContext(UserContext);
  const getEasterEgg = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    const response = await fetch("/34ST3R366", requestOptions )
    const data = await response.json();
    console.log(data);
  }
  useEffect(() => {
    getEasterEgg()
  }, [])

  return (

    <div>
      {!token? (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="contact" element={<Contact/>} />
        <Route path="about" element={<About />} />
        <Route path="Q&A" element={<QA />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        </Routes>
      ) : (
        <div>
          <Header />
          <p>You're logged in </p>
        </div>
      )}
    </div>
    
    
    
  );
}

export default App;