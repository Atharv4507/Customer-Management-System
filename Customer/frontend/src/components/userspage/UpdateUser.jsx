import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';

function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();


  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    role: '',
    street: '',
    address: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    fetchUserDataById(userId); // Pass the userId to fetchUserDataById
  }, [userId]); //wheen ever there is a chane in userId, run this

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
      const { firstname, lastname, email, phone, role, street, address, city, state } = response.ourCustomer;
      setUserData({ firstname, lastname, email, phone, role, street, address, city, state });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        const token = localStorage.getItem('token');
        const res = await UserService.updateUser(userId, userData, token);
        console.log(res)
        // Redirect to profile page or display a success message
        navigate("/admin/user-management")
      }

    } catch (error) {
      console.error('Error updating user profile:', error);
      alert(error)
    }
  };

  return (
    <div className="auth-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-row">
          <input type="text" name="firstname" value={userData.firstname} onChange={handleInputChange} placeholder='First Name' />
          <input type="text" name="street" value={userData.street} onChange={handleInputChange} placeholder='Street' />
        </div>
        <div className="form-row">
          <input type="text" name="lastname" value={userData.lastname} onChange={handleInputChange} placeholder='Last Name' />
          <input type="text" name="address" value={userData.address} onChange={handleInputChange} placeholder='Address' />
        </div>
        <div className="form-row">
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} placeholder='Email' />
          <input type="text" name="city" value={userData.city} onChange={handleInputChange} placeholder='City' />
        </div>
        <div className="form-row">
          <input type="text" name="phone" value={userData.phone} onChange={handleInputChange} placeholder='Phone' />
          <input type="text" name="state" value={userData.state} onChange={handleInputChange} placeholder='State' />
        </div>
        <div className="form-row role-row">
          <input type="text" name="role" value={userData.role} onChange={handleInputChange} placeholder='Role' />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
