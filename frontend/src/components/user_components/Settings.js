import '../../componentStylins/userDashboard.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone, and we will miss you <3")) {
            // Call API to delete the user's account
            // Example: deleteUserAccount();
            alert("Your account has been deleted.");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <ul>
                    <li><Link to="/userdashboard">Dashboard</Link></li>
                    <li><Link to="/addpet">Add Pet</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </div>
            <div className="main-content">
                <div className="danger-zone">
                    <h3>Danger Zone</h3>
                    <p>Once you delete your account, there is no way going back. Think twice!</p>
                    <button onClick={handleDeleteAccount}>Delete Account</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
