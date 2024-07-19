import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";


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
        if(window.confirm("WARNING! This action will delete this pet and all of its records. Do you still want to continue?")) {
            const requestOptions = {
                method: "DELETE",
                headers: {
                        Authorization: `Bearer ${token}`,
                },
            }
            const response = await fetch(`http://127.0.0.1:8000/pets/${id}`, requestOptions);
            if (!response.ok) {
                throw new Error("Failed to delete pet.");
            }
            if(response.status === 204) {
                console.log("Pet was deleted successfully.");
                navigate("/userdashboard");
            }
    
        }
    } 

    const renderField = (field) => (field !== null && field !== undefined ? field : "N/A");
    return (
        <div>
            <h2>Pet Information</h2>
            <div>
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
        
    )
}
export default PetCard;