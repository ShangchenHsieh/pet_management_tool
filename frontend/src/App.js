import {React, useEffect} from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact"
import About from "./components/About"
import QA from "./components/QA"
import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {
  
  const getEasterEgg = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    const response = await fetch("http://127.0.0.1:8000/34ST3R366", requestOptions )
    const data = await response.json();
    console.log(data);
  }
  useEffect(() => {
    getEasterEgg()
  }, [])

  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard/>} />
      <Route path="contact" element={<Contact/>} />
      <Route path="about" element={<About />} />
      <Route path="Q&A" element={<QA />} />

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

    </Routes>
  );
}

export default App;