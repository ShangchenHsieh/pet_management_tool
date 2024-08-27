  import {React, useContext, useEffect} from "react";
  // eslint-disable-next-line
  import { BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
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
  import UpdatePet from "./components/user_components/UpdatePet";
  import PetCard from "./components/user_components/PetCard";
  import { jwtDecode } from "jwt-decode";
  import UserProfile from "./components/user_components/UserProfile";
  import Settings from "./components/user_components/Settings";
  import Testing from "./components/Testing";
  function App() {
    const [token, setToken] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setToken(null); 
          localStorage.removeItem("access_token");
          navigate("/login"); 
        } 
      }
    }, [token, setToken, navigate]);

    return (

      <div>
        {token === null ? (
          <Routes>
            <Route path="t" element={<Testing />} />
            <Route path="" element={<Home />} />
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
              <Route path="updatepet" element={<UpdatePet />} />
              <Route path="petcard" element={<PetCard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
            
          </div>
        )}
      </div>
      
      
      
    );
    
  }

  export default App;