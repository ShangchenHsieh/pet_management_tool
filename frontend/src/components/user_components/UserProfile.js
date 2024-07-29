import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import '../../componentStylins/userDashboard.css';
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
    }, [token, decodedToken.user_id, changePW

        
    ]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors(''); 
    };

    const updateUser = async () => {
        if(formData.first_name.length === 0) {
            setErrors('Please enter your first name.')
        }
        else{
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

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser();
    };

    const handleCancel = () => {
        navigate('/userdashboard');
    }

    const handleChangePassword = () => {
        setChangePW(true);
    }

    if(changePW) {
        return (
            <div>
                <p>
                    Change pw form
                </p>
                <button className="signup-btn" onClick={handleCancel}>Cancel</button>
            </div>
        )
    }
    else {
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
                    <h2>Update User Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="first_name" className="form-label">
                                    First Name<span className="required-asterisk">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors ? 'is-invalid' : ''}`}
                                    placeholder=""
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
                                    placeholder=""
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
                                    placeholder="optional"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder=""
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <input type="submit" className="signup-btn" value="Update" />
                        </form>
                        <button className="signup-btn" onClick={handleChangePassword}>Change Password</button>
                        <button className="signup-btn" onClick={handleCancel}>Cancel</button>
                    </div>                  
                </div>
            </div>
                
        );
    }    
};

export default UpdateUser;
