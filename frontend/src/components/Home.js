import React from 'react';
import logo from '../assets/cats.jpg';
import '../componentStylins/Home.css';
import Navbar from './Navbar';
import Chatbot from './Chatbot';
function Home() {
  return (
    <>
    <Navbar />
    <div className="Home">
      <img src={logo} className="Home-logo" alt="logo" />
    </div>
    <Chatbot/>
    </>
  );
}

export default Home;
