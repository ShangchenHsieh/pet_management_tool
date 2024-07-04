import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact"
import About from "./components/About"
import Service from "./components/Services"

function App() {
  console.log(process.env.REACT_APP_API_KEY)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard/>} />
      <Route path="contact" element={<Contact/>} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Service />} />
    </Routes>
  );
}

export default App;