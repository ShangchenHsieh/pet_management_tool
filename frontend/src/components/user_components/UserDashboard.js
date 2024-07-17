import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";

const UserDashboard = () => {
    const [token] = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({});
    const [selectedPet, setSelectedPet] = useState(null);
    useEffect(() => {
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

        fetchData();
    }, [token]);

    const renderField = (field) => (field !== null && field !== undefined ? field : "N/A");

    // handle pet card clicked 
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
        console.log(selectedPet);
    }
    // a picture of the pet + its name
    return (
        <div>
            {loaded ? (
                <div>
                    {data.map((pet, index) => (
                        <div key={index}>
                        
                            <button onClick={() => handleCardClick(pet.id)}>{renderField(pet.name)}</button>
                            <p>Species: {renderField(pet.species)}</p>
                            <p>Breed: {renderField(pet.breed)}</p>
                            <p>Age: {renderField(pet.age)}</p>
                            <p>Date of Birth: {pet.dob ? new Date(pet.dob).toLocaleDateString() : "N/A"}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
};

export default UserDashboard;
