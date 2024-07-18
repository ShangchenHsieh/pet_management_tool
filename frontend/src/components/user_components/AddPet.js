import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';
import '../../componentStylins/QA.css';

const AddPet = () => {
    const navigate = useNavigate();
    const [token] = useContext(UserContext);
    const [errors, setErrors] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        breed: null,
        species: null,
        dob: null,
        age: null,
    });
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        setErrors(''); 
    };

    const createNewPet = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              name: formData.name,
              breed: formData.breed,
              species: formData.species,
              dob: formData.dob,
              age: formData.age,
            }),
          };
    
          
          
        
        if(!formData.name || formData.name.trim().length === 0) {
            setErrors("Please enter your pet's name")
            console.log(errors)
        }
        else {
          const response = await fetch('http://127.0.0.1:8000/pets', requestOptions);
          const data = await response.json();
          navigate('/userdashboard');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createNewPet();
    }


    return (
        <>
            <div className="About-container">
            <div className="login">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
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
                        <label htmlFor="Breed" className="form-label">
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
                        <label htmlFor="species" className="form-label">
                        Species
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="optional"
                          name="species"
                          value={formData.species}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="dob" className="form-label">
                          Birthday
                        </label>
                        <input
                          type="date"
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
                          placeholder="optional"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                        />
                      </div>
                      
            
                        <input type="submit" className="signup-btn" value="Create" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
      </div>
        </>
    
        
    )
}

export default AddPet;