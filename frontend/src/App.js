import {React, useContext, useEffect} from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact"
import About from "./components/About"
import QA from "./components/QA"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { UserContext } from "./context/UserContext";
import Header from "./components/user_components/Header";
import UserDashboard from "./components/user_components/UserDashboard";
import AddPet from "./components/user_components/AddPet";
function App() {
  const [token,] = useContext(UserContext);
  // const decoded_oken = jwt_decode(token);
  // const currentTime = Date.now()/1000;
  // if(decoded_jwtToken.exp < currentTime) {
  //   store.dispatch(logout())
  //   window.location.href="/";
  // }
  return (

    <div>
      {token === null ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact/>} />
          <Route path="about" element={<About />} />
          <Route path="Q&A" element={<QA />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      ) : (
        <div>
          <Header />
          
          <Routes>
            <Route path="userdashboard" element={<UserDashboard />} />
            <Route path="addpet" element={<AddPet />} />
          </Routes>
          
        </div>
      )}
    </div>
    
    
    
  );
  
}

export default App;