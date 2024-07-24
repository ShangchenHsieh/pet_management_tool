import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import PetCard from "./PetCard";
import AddPet from "./AddPet";
import cat from "../../assets/cat.jpg";
import dog from "../../assets/dog.jpg";
import rabbit from "../../assets/rabbit.jpg";
import python from "../../assets/python.jpg";
import '../../componentStylins/userDashboard.css';
const UserDashboard = () => {
    const [token] = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [showAddPet, setShowAddPet] = useState(false);
    const [showUpdatePet, setShowUpdatePet] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        species: '',
        dob: '',
        age: ''
    });
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            if (!token) return; 

            const decodedToken = jwtDecode(token);
            const userid = decodedToken.user_id; 
        
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch("http://127.0.0.1:8000/pets/all", requestOptions);
            if (!response.ok) {
                throw new Error("Failed to fetch pets.");
            }

            const fetchedData = await response.json();
            setData(fetchedData);
            setLoaded(true);
        } catch (error) {
            console.error("Error fetching pets:", error);
            setErrorMessage("Failed to fetch pets.");
        }
    };

    useEffect(() => {
        if (selectedPet) {
            setFormData({
                name: selectedPet.name || '',
                breed: selectedPet.breed || '',
                species: selectedPet.species || '',
                dob: selectedPet.dob ? formatDate(selectedPet.dob) : '',
                age: selectedPet.age || '',
            });
        }
    }, [selectedPet]);

    const formatDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    useEffect(() => {
        fetchData();
    }, [token, ]);

    

    const handleCardClick = async (id) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`http://127.0.0.1:8000/pets/${id}`, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to fetch pet.");
        }

        const pet = await response.json();
        setSelectedPet(pet);
        navigate("/petcard", { state: { selectedPet: pet } });
    }
    const handleUpdateClick = (pet) => {
        setSelectedPet(pet);
        setShowUpdatePet(true);
    };
    const getDefaultImage = (type) => {
        switch (type) {
            case "cat":
                return cat;
            case "dog":
                return dog;
            case "rabbit":
                return rabbit;
            case "python":
                return python;
            default:
                return cat;
        }
    };
    const handleDelete = async (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`http://127.0.0.1:8000/pets/${id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Failed to delete pet.");
            return;
        }

        setData(data.filter(pet => pet.id !== id));
    };
    const handleUpdateSubmit = async (formData) => {
        const requestOptions = {
            method: 'PUT', 
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        };

        if (!formData.name || formData.name.trim().length === 0) {
            setErrorMessage("Please enter your pet's name");
            return;
        }

        const response = await fetch(`http://127.0.0.1:8000/pets/${selectedPet.id}`, requestOptions);
        if (response.ok) {
            setShowUpdatePet(false);
            fetchData(); 
        } else {
            const data = await response.json();
            setErrorMessage(data.message || 'Failed to update pet');
        }
    };



    return (
        <div className="dashboard-container">
            {showUpdatePet && selectedPet && (
                <div className="update-pet-container-overlay">
                    <div className="update-pet-container">
                        <h2>Update Pet Information</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateSubmit(formData);
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Name<span className="required-asterisk">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errorMessage ? 'is-invalid' : ''}`}
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="breed" className="form-label">
                                    Breed
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="breed"
                                    value={formData.breed}
                                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="species" className="form-label">
                                    Species
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="species"
                                    value={formData.species}
                                    onChange={(e) => setFormData({ ...formData, species: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age" className="form-label">
                                    Age
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="age"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>
                            <input type="submit" className="signup-btn" value="Update" />
                        </form>
                        <button className="signup-btn" onClick={() => setShowUpdatePet(false)}>Cancel</button>
                    </div>
                </div>
            )}
            <div className="navbar-options">
            <div className="navbar-options"> <Link to="/addpet">Add a New Pet</Link></div>
            </div>
            {showAddPet && <AddPet onClose={() => setShowAddPet(false)} />}
            <div className="card-container">
                {data.map((pet, index) => (
                    <div className="card" key={index} onClick={() => handleCardClick(pet.id)}>
                        <img src={pet.image || getDefaultImage(pet.species)} alt={pet.name} />
                        <div className="card-content">
                            <h3>{pet.name}</h3>
                            <p>Species: {pet.species}</p>
                            <p>Breed: {pet.breed}</p>
                            <p>Age: {pet.age}</p>
                            <p>Date of birth: {pet.dob}</p>
                            <div className="card-buttons">
                                <button className="update-button" onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering card click
                                    handleUpdateClick(pet);
                                }}>Update</button>
                                <button className="delete-button" onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering card click
                                    handleDelete(pet.id);
                                }}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
    );
};

export default UserDashboard;