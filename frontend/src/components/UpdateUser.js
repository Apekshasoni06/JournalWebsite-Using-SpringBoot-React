import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUser = () => {
  const [user, setUser] = useState({
    userName: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/user', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('/user');
      alert('User deleted successfully!');
      // Redirect or logout logic would go here
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  return (
    <div className="update-user">
      <h2>Update User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Username:</label>
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
        <button
          type="button"
          onClick={handleDelete}
          style={{marginLeft: '10px', backgroundColor: 'red', color: 'white'}}
        >
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;