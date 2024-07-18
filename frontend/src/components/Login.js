import React, { useState, useContext }  from 'react';
import Navbar from './Navbar';
import '../componentStylins/QA.css';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [, setToken] = useContext(UserContext);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };

  const submitLogin = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData),
    };
    const response = await fetch('http://127.0.0.1:8000/login', requestOptions);
    const data = await response.json();
    if (response.status === 403) {
      setErrors(data.detail); 
    } 
    else {
      setToken(data.access_token);
      localStorage.setItem('access_token', data.access_token);
      navigate('/userdashboard')
    }

    
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <>
      <Navbar />
      <div className="About-container">
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username" className="form-label">
                      Username<span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
                      placeholder="example@gmail.com"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {errors && <div className="invalid-feedback">{errors}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password<span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                      placeholder=""
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  
                  <input type="submit" className="signup-btn" value="Sign In " />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;