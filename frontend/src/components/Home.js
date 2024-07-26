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
    // { imgURL: python, imgAlt: 'python' },
  ];

  return (
    <>
      <Navbar />
      <div className="Home">
        <img src={logo} className="Home-logo" alt="logo" />
        <div className="overlay">
          <div className="content">
            <h2>PAWfect+</h2>
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
                  Ensure that vaccinations are up-to-date and track any illnesses or injuries. 
                  Use our tool to set reminders for vet appointments and medications. 
                  You can also log symptoms and monitor recovery progress over time.
                </p>              </div>
              <div className="card mid-info">
              <div className="icon-container">
                  <img src={diet} alt="diet" className="card-icon" />
                </div>
                <h3>Diet Management</h3>
                <p>
                  Plan and manage your pet's diet with personalized meal recommendations. 
                  Track their eating habits and ensure they get the right balance of nutrients. 
                  Set feeding schedules, and get alerts if a meal is missed. 
                  Our tool can also suggest dietary changes based on your pet’s health and activity levels.
                </p>              </div>
              <div className="card right-info">
              <div className="icon-container">
                  <img src={log} alt="activity log" className="card-icon" />
                </div>
                <h3>Activity Log</h3>
      
                <p>
                  Keep track of your pet's activities and ensure they get enough exercise. 
                  Log daily walks, playtime, and other physical activities. 
                  Monitor their activity levels over time to make sure they are staying active and healthy. 
                  You can also set fitness goals and track progress towards achieving them.
                </p>              </div>
                <Chatbot />
            </div>
            
          </div>
          
        </div>
       
      </div>
      
    </>
  );
}

export default Home;
