import React from 'react';
import logo from '../assets/cats.jpg';
import '../componentStylins/Home.css';
import Navbar from './Navbar';
import Chatbot from './Chatbot';
import CustomCarousel from './CustomCarousel';
import cute_dog from '../assets/petImages/Cute_dog.jpg';
import hamster from '../assets/petImages/hamster.jpg';
import happy_dog from '../assets/petImages/happy_dog.jpg';
import parrot from '../assets/petImages/parrot.jpg';
import turtle from '../assets/petImages/turtle.jpg';
import two_doges from '../assets/petImages/two_dogs.jpg';

function Home() {
  const images = [
    { imgURL: cute_dog, imgAlt: 'Cute Dog' },
    { imgURL: hamster, imgAlt: 'Hamster' },
    { imgURL: happy_dog, imgAlt: 'Happy Dog' },
    { imgURL: parrot, imgAlt: 'Parrot' },
    { imgURL: turtle, imgAlt: 'Turtle' },
    { imgURL: two_doges, imgAlt: 'Two Dogs' }
  ];
  return (
    <>
      <Navbar />
      <div className="Home">
        <img src={logo} className="Home-logo" alt="logo" />
        <div className="overlay">
          <div className="content">
            <h1>Your Content Here</h1>
            <div className="content-body">
              <div className="content-left" >
                <h3>This is where you can put your page <span>sadsasad</span>.</h3>
              </div>
              <div className="content-right">
                <CustomCarousel>
                  {images.map((image, index) => (
                    <img key={index} src={image.imgURL} alt={image.imgAlt} />
                  ))}
                </CustomCarousel>
              </div>
            </div>
            dsfdsfd
            dasdas
          </div>
        </div>
      </div>
      <Chatbot />
    </>
  );
}

export default Home;
