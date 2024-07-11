import React, { useContext } from 'react';
import '../../componentStylins/Navbar.css';
import { UserContext } from '../../context/UserContext';
import icon from '../../assets/cat_paw_icon.png';

const Header = () => {
    const [token, setToken] = useContext(UserContext);
    const handleLogout = () => {
        setToken(null);
        localStorage.setItem('access_token', null)
    }
    return (
        <div className="navbar">
          <div className="navbar-logo">
            <img src={icon} alt="Logo" />
          </div>
          <div className="navbar-center">
            <div className="navbar-options">
            </div>
          </div>
          <div className="">
            {token && (<button className='logout-btn' onClick={handleLogout}>Logout</button>)}
          </div>
        </div>
      );


}

export default Header;
