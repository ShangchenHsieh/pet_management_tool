import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../../componentStylins/PetCard.css"
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
    const location = useLocation();
    const { selectedPet } = location.state || {};
    const [records, setRecords] = useState("");

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

    const handleAddRecord = async (pet_id) => {
        }
    
    const fetchRecords = async (pet_id) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(`http://127.0.0.1:8000/pet_records/all/${pet_id}`, requestOptions);
        if(!response.ok) {
            console.log("failed to fetch records");
        }
        else {
            const data = await response.json();  // Await the response to be converted to JSON
            setRecords(data);
           
        }

    }

    useEffect(() => {
       
        fetchRecords(selectedPet.id);
    }, []);

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
                <div className="main-content1">
                    <h2>{renderField(selectedPet.name)}</h2>
                    <div>
                        <img src={getDefaultImage(selectedPet.species)} alt={selectedPet.species} style={{ width: '200px', height: '200px' }} />
                        
                        <p>Species: {renderField(selectedPet.species)}</p>
                        <p>Breed: {renderField(selectedPet.breed)}</p>
                        <p>Age: {renderField(selectedPet.age)}</p>
                        <p>Date of Birth: {selectedPet.dob ? new Date(selectedPet.dob).toLocaleDateString() : "N/A"}</p>
                        <button className="update-btn" onClick={handleUpdatePet}>Update</button>
                        <button className="return-btn" onClick={handleCancel}>Return</button>
                    </div>
                    <button className="delete-btn" onClick={() => handleDeletePet(selectedPet.id)}>Delete</button>
                    
                </div>
                <div className="main-content1">
                    
                <div className="record-header">
                    <h2>Records of {renderField(selectedPet.name)}</h2>
                    <button className="new-record-btn">
                        New Record +
                    </button>
                </div>

                    <div className="records-container">
                        {records && records.length > 0 ? (
                            records.map((record, index) => (
                                <button key={index} className="record-row" onClick={handleAddRecord}>
                                    
                                    <p className="record-item">{record.date.split("T")[0]}</p>
                                    <p className="record-item">{record.height}</p>
                                    <p className="record-item">{record.weight}</p>
                                    <p className="record-item">{record.description}</p>
                                </button>
                            ))
                        ) : (
                            <h>No records found.</h>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PetCard;
