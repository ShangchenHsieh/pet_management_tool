import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import PetCard from "./PetCard";
import PageContent from "../PageContent";
import SideMenu from "../SideMenu";
import '../../componentStylins/Dashboard.css';
const UserDashboard = () => {
    const [token] = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({});
    const [selectedPet, setSelectedPet] = useState(null);
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
    // a picture of the pet + its name
    return (
        <div>
        <div className="navbar-options"> <Link to="/addpet">Add a New Pet</Link></div>
        
            {loaded ? (
                <div>
                    {data.map((pet, index) => (
                        <div key={index}>
                            <button onClick={() => handleCardClick(pet.id)}>{(pet.name)}</button>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <div className="SideMenuAndPageContent">
            <SideMenu></SideMenu>
            <PageContent></PageContent>
            </div>
            
        </div>
    );
};

export default UserDashboard;
