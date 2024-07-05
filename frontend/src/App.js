import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact"
import About from "./components/About"
import QA from "./components/QA"

function App() {
  console.log(process.env.REACT_APP_API_KEY)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard/>} />
      <Route path="contact" element={<Contact/>} />
      <Route path="about" element={<About />} />
      <Route path="Q&A" element={<QA />} />
    </Routes>
  );
}

export default App;