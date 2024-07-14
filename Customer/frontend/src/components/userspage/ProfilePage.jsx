import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';



function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourCustomer);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="profile-page-container">
            <h2>Your Profile</h2>
            <p>Name: {profileInfo.firstname} {profileInfo.lastname}</p>
            <p>Email: {profileInfo.email}</p>
            <p>Phone: {profileInfo.phone}</p>
            <p>Street: {profileInfo.street}</p>
            <p>Address: {profileInfo.address}</p>
            <p>City: {profileInfo.city}</p>
            <p>State: {profileInfo.state}</p>
            {profileInfo.role === "ADMIN" && (
                <button><Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link></button>
            )}
        </div>
    );
}

export default ProfilePage;
