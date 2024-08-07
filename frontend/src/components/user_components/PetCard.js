import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

// Import images for different species
import cat from "../../assets/cat.jpg";
import dog from "../../assets/dog.jpg";
import rabbit from "../../assets/rabbit.jpg";
import python from "../../assets/python.jpg";
import pigeon from "../../assets/stupid_bird.jpg";
import mouse from "../../assets/unknown_animal.jpg";

const PetCard = () => {
    const navigate = useNavigate();
    const [token] = useContext(UserContext);
    const [errors, setErrors] = useState('');
    const location = useLocation();
    const { selectedPet } = location.state || {};

    const handleCancel = () => {
        navigate('/userdashboard');
    };

    const handleUpdatePet = () => {
        console.log(selectedPet);
        navigate("/updatepet", { state: { selectedPet } });
    }

    const handleDeletePet = async (id) => {
        if (window.confirm("WARNING! This action will delete this pet and all of its records. Do you still want to continue?")) {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await fetch(`http://127.0.0.1:8000/pets/${id}`, requestOptions);
            if (!response.ok) {
                throw new Error("Failed to delete pet.");
            }
            if (response.status === 204) {
                console.log("Pet was deleted successfully.");
                navigate("/userdashboard");
            }
        }
    };

    const renderField = (field) => (field !== null && field !== undefined ? field : "N/A");

    const getDefaultImage = (species) => {
        switch (species) {
            case "cat":
                return cat;
            case "dog":
                return dog;
            case "rabbit":
                return rabbit;
            case "python":
                return python;
            case "pigeon":
                return pigeon;
            case "mouse":
                return mouse;
            default:
                return null;
        }
    };

    return (
        <div>
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
                    <h2>Pet Information</h2>
                    <div>
                        <img src={getDefaultImage(selectedPet.species)} alt={selectedPet.species} style={{ width: '200px', height: '200px' }} />
                        <h3>{renderField(selectedPet.name)}</h3>
                        <p>Species: {renderField(selectedPet.species)}</p>
                        <p>Breed: {renderField(selectedPet.breed)}</p>
                        <p>Age: {renderField(selectedPet.age)}</p>
                        <p>Date of Birth: {selectedPet.dob ? new Date(selectedPet.dob).toLocaleDateString() : "N/A"}</p>
                        <button onClick={handleUpdatePet}>Update</button>
                        <button onClick={() => handleDeletePet(selectedPet.id)}>Delete</button>
                    </div>
                    <button onClick={handleCancel}>Return</button>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
