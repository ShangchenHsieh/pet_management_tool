import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content--Type": "application/json", 
                    Authorization: "Bearer " + token, 
                }
            }
            const response = await fetch("/owners/all", requestOptions);
            if(!response.ok) {
                setToken(null);
            }
            localStorage.setItem("access_token", token);
        }
        fetchUser();
    }, [token]);
    return (
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}