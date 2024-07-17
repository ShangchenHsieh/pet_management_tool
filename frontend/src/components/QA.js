import React from 'react';
import Navbar from './Navbar';
import '../componentStylins/QA.css';
import Chatbot from './Chatbot';
const QA = () => {
  return (
    <>
      <Navbar />
      <div className="About-container">
        <div className="About-content">
          <p>Approach 1:
            This approach will create a simple random string by selecting some characters randomly with the specified length. This will be a simple string instead of an alpha-numeric string. Follow the steps below:

            Create a user-defined function and define a variable having all English alphabets in small and capital letters.
            Define the length for the new random string to be generated.
            Declare a new empty variable (var randomstring = '';) to hold the generated string.
            Now, traverse the string using for loop. It will generate a new character during each iteration.
            Inside this loop, use Math.random() method of JavaScript to generate a random character from the above-specified string variable (A-Z, a-z) by calculating a random index.
            floor() method to round off the value. This will be used as Math.floor(Math.random() * characters.length).
            Convert the above steps in actual code implementation to see the result. Look at the JavaScript code below:
          </p>
        </div>
      </div>
      <Chatbot />
    </>
  );
}

export default QA;