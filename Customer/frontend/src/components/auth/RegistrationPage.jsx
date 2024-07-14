import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        role: '',
        street: '',
        address: '',
        city: '',
        state: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await UserService.register(formData, token);

            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                role: '',
                street: '',
                address: '',
                city: '',
                state: '',
                password: ''
            });
            alert('User registered successfully');
            navigate('/admin/user-management');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <div className="auth-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-row">
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} placeholder='First Name' />
                    <input type="text" name="street" value={formData.street} onChange={handleInputChange} placeholder='Street' />
                </div>
                <div className="form-row">
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} placeholder='Last Name' />
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder='Address' />
                </div>
                <div className="form-row">
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder='Email' />
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder='City' />
                </div>
                <div className="form-row">
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder='Phone' />
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder='State' />
                </div>
                <div className="form-row">
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder='Role' />
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder='password' />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;
