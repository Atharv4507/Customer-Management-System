import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSync, faMinus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('id');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, searchBy, users]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getAllUsers(token);
      setUsers(response.ourCustomerList);
      setFilteredUsers(response.ourCustomerList); // Initially, set filtered users to all users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const syncUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.syncUsers(token);
      setUsers(response);
      setFilteredUsers(response);
    } catch (error) {
      console.error('Error syncing users:', error);
    }
  };
  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      const token = localStorage.getItem('token');
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filterUsers = () => {
    if (!searchQuery) {
      setFilteredUsers(users);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = users.filter(user => {
      const fieldValue = String(user[searchBy]).toLowerCase();
      return fieldValue.includes(query);
    });
    setFilteredUsers(filtered);
  };

  return (
    <div className="user-management-container">
      <h2>Customer Management Page</h2>
      <div className='addbuttoninline'>
      <button className='reg-button'>
        <Link to="/register"className='addUserhover' >Add User</Link>
      </button>

      <button className='sync-button' onClick={syncUsers}>
          <FontAwesomeIcon icon={faSync} /> Sync
      </button>

      <div className="search-container">
      <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
          <option value="id">ID</option>
          <option value="email">Email</option>
          <option value="firstname">First Name</option>
          <option value="lastname">Last Name</option>
          <option value="city">City</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
      </div>
    </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Street</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.street}</td>
              <td>{user.address}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>
                <button className='delete-icon' onClick={() => deleteUser(user.id)}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <br/>
                <Link to={`/update-user/${user.id}`} className='edit-icon'>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;
