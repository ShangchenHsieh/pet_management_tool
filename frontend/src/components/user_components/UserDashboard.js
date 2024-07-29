import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";

import AddPet from "./AddPet";
import cat from "../../assets/cat.jpg";
import dog from "../../assets/dog.jpg";
import rabbit from "../../assets/rabbit.jpg";
import python from "../../assets/python.jpg";
import pigeon from "../../assets/stupid_bird.jpg";
import mouse from "../../assets/unknown_animal.jpg";
import '../../componentStylins/userDashboard.css';
import paw from "../../assets/default_pic/dog-placeholder.jpg"

const UserDashboard = () => {
    const [token] = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    

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
    }, [token]);

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
            case "pigeon", 'Bird':
                return pigeon;
            case "mouse":
                return mouse;
            default:
                return paw;
        }
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
                
                <Space size={10} direction="vertical" style={{marginLeft:"30px"}}>
                    <Typography.Title level={4}>User Dashboard</Typography.Title>
                    <Space direction="horizontal">
                        <DashboardCard
                            icon={
                                <UserOutlined
                                    style={{
                                        color: "rgba(45,65,53,0.7)",
                                        backgroundColor: "rgba(45,65,53,0.25)",
                                        borderRadius: 20,
                                        fontSize: 24,
                                        padding: 8,
                                    }}
                                />
                            }
                            title={"Number of Pets"}
                            value={data.length} // Assuming 'data' represents employees
                        />
                        <DashboardCard
                            icon={
                                <UserOutlined
                                    style={{
                                        color: "purple",
                                        backgroundColor: "rgba(0,255,255,0.25)",
                                        borderRadius: 20,
                                        fontSize: 24,
                                        padding: 8,
                                    }}
                                />
                            }
                            title={"Customers"}
                            value={1} // Assuming 'customers' is a state or prop
                        />
                        <DashboardCard
                            icon={
                                <ShoppingOutlined
                                    style={{
                                        color: "blue",
                                        backgroundColor: "rgba(0,0,255,0.25)",
                                        borderRadius: 20,
                                        fontSize: 24,
                                        padding: 8,
                                    }}
                                />
                            }
                            title={"Inventory"}
                            value={1} // Assuming 'cars' is a state or prop
                        />

                    </Space>

                </Space>
                <div className="navbar-options">
                    <Link to="/addpet">Add a New Pet</Link>
                </div>
                
                <div className="card-container">
                    {data.map((pet, index) => (
                        <div className="card" key={index} onClick={() => handleCardClick(pet.id)}>
                            <img src={pet.image || getDefaultImage(pet.species)} alt={pet.name} />
                            <div className="card-content">
                                <h3>{pet.name}</h3>
                                    
                                
                            </div>
                        </div>
                    ))}
                </div>
                {errorMessage && <div className="error">{errorMessage}</div>}
            </div>
        </div>
    );
};


function DashboardCard({ title, value, icon }) {
    return (
      <Card style={{height: "100px", width: "250px", display: "flex", alignItems: "center"}}>
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    );
  }
export default UserDashboard;
