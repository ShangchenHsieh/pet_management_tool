import React from 'react';
import Navbar from './Navbar';
import '../componentStylins/About.css';
import Chatbot from './Chatbot';
const About = () => {
  return (
    <>
      <Navbar />
      <div className="About-container">
        <div className="About-content">
          <p>A while ago, a friend of mine, who is just beginning to explore the wonderful world of frontend development, asked me how to start testing her application. Over the phone. I told her that, obviously, I can’t do it over the phone as there is so much to learn about this subject. I promised to send her links to guide her along the way. And so I sat down on my computer and googled the subject. I found lots of links, which I sent her, but was dissatisfied with the depth of what they were discussing. I could not find a comprehensive guide — from the point of view of a frontend newbie — to testing frontend applications. I could not find a guide that discusses both the theory and the practice, and is oriented towards testing frontend application.So I decided to write one. And this is the first part of this series of blogs. You can find the other parts here:IntroductionUnit TestingE2E TestingIntegration TestingVisual Testing</p>
        </div>
      </div>
      <Chatbot />
    </>
  );
}

export default About;