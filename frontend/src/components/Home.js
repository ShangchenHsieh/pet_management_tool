import React from 'react';
import logo from '../assets/cats.jpg';
import '../componentStylins/Home.css'
import Navbar from './Navbar';
import Chatbot from './Chatbot';
import CustomCarousel from './CustomCarousel';
import parrot from '../assets/petImages/parrot.jpg';
import turtle from '../assets/petImages/turtle.jpg';
import small_dog from '../assets/petImages/small_dog.jpg';
import cat from '../assets/petImages/cat.jpg';
import health from '../assets/icons/health.png';
import log from '../assets/icons/log.png';
import diet from '../assets/icons/diet.png';
import python from '../assets/default_pic/python.jpg'

function Home() {
  const images = [
    { imgURL: small_dog, imgAlt: 'small dog' },
    { imgURL: parrot, imgAlt: 'parrot' },
    { imgURL: turtle, imgAlt: 'turtle' },
    { imgURL: cat, imgAlt: 'cat' },
    { imgURL: python, imgAlt: 'python' },
  ];

  return (
    <>
      <Navbar />
      <div className="Home">
        <div className="">
          <div className="content">
            <h1>PAWfect+</h1>
            <div className="content-body">
              <div className="content-left">
                <h3>A perfect application designed to keep track of your <span>pets!</span></h3>
              </div>
              <div className="content-right">
                <CustomCarousel>
                  {images.map((image, index) => (
                    <img key={index} src={image.imgURL} alt={image.imgAlt} />
                  ))}
                </CustomCarousel>
              </div>
            </div>
            <div className="content-cards">
              <div className="card left-info">
              <div className="icon-container">
                  <img src={health} alt="health" className="card-icon" />
                </div>
                <h3>Health Tracking</h3>

                <p>
                  Monitor your pet's health with regular check-ups and keep track of medical history.
                  
                </p>              </div>
              <div className="card mid-info">
              <div className="icon-container">
                  <img src={diet} alt="diet" className="card-icon" />
                </div>
                <h3>Diet Management</h3>
                <p>
                  Plan and manage your pet's diet with personalized meal recommendations. 
                  
                  
                </p>              </div>
              <div className="card right-info">
              <div className="icon-container">
                  <img src={log} alt="activity log" className="card-icon" />
                </div>
                <h3>Activity Log</h3>
      
                <p>
                  Keep track of your pet's activities and ensure they get enough physical activities. 
                  
                  
                </p>              </div>
                <Chatbot />
            </div>
            
          </div>
          
        </div>
        <style>
          
        </style>
        <footer>
          &copy; 2024 PAWfect+. All Rights Reserved.
        </footer>
       
      </div>
      
    </>
  );
}

export default Home;
