import React, { useContext, useEffect } from 'react';
import '../../componentStylins/Navbar.css';
import { UserContext } from '../../context/UserContext';
import icon from '../../assets/cat_paw_icon.png';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import default_user_pic from "../../assets/default_pic/default-user.jpg"

const Header = () => {
  const [token, setToken] = useContext(UserContext);
  const handleLogout = () => {
      setToken(null);
      localStorage.setItem('access_token', null);
      localStorage.removeItem('access_token');
      navigate('/');
  }
  const navigate = useNavigate();
  const decodedToken = jwtDecode(token);

  

  return (
      <div className="navbar">
          <div className="navbar-left">
              <div className="navbar-logo">
                  <img src={icon} alt="Logo" />
              </div>
              <h3>PAWfect+</h3>
          </div>
          <div className="navbar-center">
              <div className="navbar-options">
              </div>
          </div>
            
          <div className="navbar-right">            
            {token && (
              <div className="user-profile">
                <img src={default_user_pic} alt="User Profile" className="user-profile-pic" />
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
      </div>
  );
}

export default Header;
