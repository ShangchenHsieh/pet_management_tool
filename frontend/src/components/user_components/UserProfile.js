import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import '../../componentStylins/userDashboard.css';
import default_user_pic from '../../assets/default_pic/default-user-2.jpg';

const UpdateUser = () => {
    const navigate = useNavigate();
    const [token] = useContext(UserContext);
    const decodedToken = jwtDecode(token);
    const [errors, setErrors] = useState('');
    const [changePW, setChangePW] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        username: ''
    });
    const [passwordData, setPasswordData] = useState({
        password: '',
        new_password: '',
        confirm_password: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const response = await fetch(`http://127.0.0.1:8000/owners/${decodedToken.user_id}`, requestOptions);
                if (!response.ok) {
                    console.log(response);
                    throw new Error("Failed to fetch the user.");
                }
                const data = await response.json();
                setFormData({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    phone: data.phone,
                    username: data.username
                });
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        
        fetchUser();
    }, [token, decodedToken.user_id, changePW]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors(''); 
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
        setErrors('');
    };

    const updateUser = async () => {
        if (formData.first_name.length === 0) {
            setErrors('Please enter your first name.');
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            };
    
            const response = await fetch(`http://127.0.0.1:8000/owners/${decodedToken.user_id}`, requestOptions);
            if (response.ok) {
                navigate('/userdashboard');
            } else {
                const data = await response.json();
                setErrors(data.detail || 'Failed to update user');
            }
        }
    };

    const updatePassword = async () => {
        if (passwordData.new_password !== passwordData.confirm_password) {
            setErrors("Passwords do not match.");
            return;
        } 
        else if(passwordData.new_password.length === 0) {
            setErrors("New Password can not be empty.")
            return;
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                password: passwordData.password,
                new_password: passwordData.new_password
            }),
        };

        const response = await fetch(`http://127.0.0.1:8000/owners/pwupdate`, requestOptions);
        if (response.ok) {
            navigate('/userdashboard');
        } else {
            const data = await response.json();
            setErrors(data.detail || 'Failed to update password');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser();
    };

    const handleCancel = () => {
        navigate('/userdashboard');
    };

    const handleChangePassword = () => {
        setChangePW(true);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        updatePassword();
    };

    if (changePW) {
        return (
            <div>
                <div className="sidebar">
                    <ul>
                        <li><Link to="/userdashboard">Dashboard</Link></li>
                        <li><Link to="/addpet">Add Pet</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                    </ul>
                </div>
                <div className="main-content-2">
                    <div className="form-container">
                        <h2>Change Password</h2>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Original Password<span className="required-asterisk">*</span>
                                </label>
                                <input
                                    type="password"
                                    className={`form-control form-control-lg ${errors ? 'is-invalid' : ''}`}
                                    name="password"
                                    value={passwordData.password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="new_password" className="form-label">
                                    New Password<span className="required-asterisk">*</span>
                                </label>
                                <input
                                    type="password"
                                    className={`form-control form-control-lg ${errors ? 'is-invalid' : ''}`}
                                    name="new_password"
                                    value={passwordData.new_password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm_password" className="form-label">
                                    Confirm New Password<span className="required-asterisk">*</span>
                                </label>
                                <input
                                    type="password"
                                    className={`form-control form-control-lg ${errors ? 'is-invalid' : ''}`}
                                    name="confirm_password"
                                    value={passwordData.confirm_password}
                                    onChange={handlePasswordChange}
                                />
                                {errors && <div className="invalid-feedback">{errors}</div>}
                            </div>
                            <input type="submit" className="signup-btn" value="Update Password" />
                        </form>
                        <button className="signup-btn" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="update-user-container">
                <div className="sidebar">
                    <ul>
                        <li><Link to="/userdashboard">Dashboard</Link></li>
                        <li><Link to="/addpet">Add Pet</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                    </ul>
                </div>
                <div className="main-content-2">
                    <div className="form-container">
                        <div className="profile-pic-container">
                            <img src={default_user_pic} alt="User" className="profile-pic" />
                            <div className="overlay">
                                <div className="text">Edit</div>
                            </div>
                        </div>
                        <h2>Update User Information</h2>
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Username: 
                            </label>
                            <p>{formData.username}</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="first_name" className="form-label">
                                    First Name<span className="required-asterisk">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors ? 'is-invalid' : ''}`}
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                                {errors && <div className="invalid-feedback">{errors}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name" className="form-label">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <input type="submit" className="update-button" value="Update" />
                        </form>
                        <button className="update-button" onClick={handleChangePassword}>Change Password</button>
                        <button className="signup-btn" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default UpdateUser;
