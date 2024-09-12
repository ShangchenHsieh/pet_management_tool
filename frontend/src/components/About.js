import React from 'react';
import Navbar from './Navbar';
import '../componentStylins/About.css';
import Chatbot from './Chatbot';
import yar_pic from '../assets/developers/yar.jpg';
import sean from '../assets/developers/sean.jpg';
import not_found from '../assets/developers/404.jpg'

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-content">
          <h1>We are team Taco!</h1>
          <p className="team-intro">
            Taco is made up of three passionate students from San Jose State University, specializing in full-stack web application development. And we're excited to bring our professional skills to the industry.
          </p>

          <div className='spacer'>
            <h1>Meet our team members!</h1>

            {/* Yar's Section */}
            <div className="team-member">
              <img src={yar_pic} alt="Yar" className="team-img left-img" />
              <div className="team-description">
                <h1>Yar</h1>
                <p>
                  This is our frontend developer in his natural habitat. Yar is mainly responsible for the visual parts of this project. One fun fact about him: motivated by paychecks, operated by energy drinks!
                </p>
              </div>
            </div>

            {/* Sean's Section */}
            <div className="team-member reverse">
              <img src={sean} alt="Sean" className="team-img right-img" />
              <div className="team-description">
                <h1>Sean</h1>
                <p>
                  This is our full-stack developer, with his happy dog friend Kuma. He is responsible for the backend and security part of this project. One fun fact about him: unlike Yar, he is operated by coffee or tea. If you have a chance to meet him, remember to buy him a coffee!
                </p>
              </div>
            </div>    

            {/* Big D. Section */}
            <div className="team-member">
              <img src={not_found} alt="Big D." className="team-img left-img2" />
              <div className="team-description">
                <h1>Big D.</h1>
                <p>
                  This dude is our cybersecurity engineer, Big D., but currentyl he's too cool to reveal his face. He is responsible for discovering volunerbilities within our application, in other words, he gets creative when it comes to breaking things. One fuc fact about him: he's too mysterous, we don't know anything about him yet. :(
                </p>
              </div>
            </div>

          </div>
          
          
        </div>
      </div>
      <Chatbot />
    </>
  );
};

export default About;
