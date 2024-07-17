import React from 'react';
import Navbar from './Navbar';
import '../componentStylins/Contact.css';
import Chatbot from './Chatbot';
const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="About-container">
        <div className="About-content">
          <p>Sometimes, programmers require to create a string which is generated by selecting the random characters. Random String Generator helps to create a random string by choosing some characters randomly. This string can be a simple character string or an alpha-numeric string. In this chapter, you will get the different methods to create a random string generator. We will create a random string generator program using the JavaScript programming language to generate a random string. Each time it will generate a new string. For this, we will use the Math.random() function of JavaScript.</p>
        </div>
      </div>
      <Chatbot />
    </>
    
  );
}

export default Contact;