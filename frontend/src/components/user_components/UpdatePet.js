import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import '../../componentStylins/userDashboard.css';
const UpdatePet = () => {
    const navigate = useNavigate();
    const [token] = useContext(UserContext);
    const [errors, setErrors] = useState('');
    const location = useLocation();
    const { selectedPet } = location.state || {};

    // Helper function to format date as YYYY-MM-DD
    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const [formData, setFormData] = useState({
        name: selectedPet?.name || '',
        breed: selectedPet?.breed || '',
        species: selectedPet?.species || '',
        dob: selectedPet?.dob ? formatDate(selectedPet.dob) : '',
        age: selectedPet?.age || '',
    });

    useEffect(() => {
        if (!selectedPet) {
            navigate('/userdashboard'); // Redirect if no pet is selected
        }
    }, [selectedPet, navigate]);

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        setErrors(''); 
    };

    const updatePet = async () => {
        const requestOptions = {
            method: 'PUT', // Use PUT method for updating
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        };

        if (!formData.name || formData.name.trim().length === 0) {
            setErrors("Please enter your pet's name");
        } else {
            const response = await fetch(`http://127.0.0.1:8000/pets/${selectedPet.id}`, requestOptions);
            if (response.ok) {
                navigate('/userdashboard');
            } else {
                const data = await response.json();
                setErrors(data.message || 'Failed to update pet');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePet();
    };

    const handleCancel = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`http://127.0.0.1:8000/pets/${selectedPet.id}`, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to fetch pet.");
        }

        const pet = await response.json();
        
        navigate("/petcard", { state: { selectedPet: pet } });
    };

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
            <div className="main-content">
                <h2>Update Pet Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Name<span className="required-asterisk">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control form-control-lg ${errors ? 'is-invalid' : ''}`}
                            placeholder=""
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors && <div className="invalid-feedback">{errors}</div>}
                    </div>
        
                    <div className="form-group">
                        <label htmlFor="species" className="form-label">
                            Species
                        </label>
                        <select
                            className="form-control form-control-lg"
                            name="species"
                            value={formData.species}
                            onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                        >
                            <option value="">Select Species</option>
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="rabbit">Rabbit</option>
                            <option value="python">Python</option>
                            <option value="pigeon">Pigeon</option>
                            <option value="mouse">Mouse</option>
                        </select>
                    </div>
        
                    <div className="form-group">
                        <label htmlFor="breed" className="form-label">
                            Breed
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="optional"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="dob" className="form-label">
                            Birthday
                        </label>
                        <input
                            type="date"
                            className="form-control form-control-lg"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">
                            Age
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="optional"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </div>
                    <input type="submit" className="signup-btn" value="Update" />
                </form>
                <button className="signup-btn" onClick={handleCancel}>Cancel</button>
                    
            </div>
        </div>

       
    );
};

export default UpdatePet;
