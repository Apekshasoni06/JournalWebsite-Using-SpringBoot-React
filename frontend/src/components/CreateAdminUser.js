import React, { useState } from 'react';
import axios from 'axios';

const CreateAdminUser = () => {
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
    const username = "lola";
    const password = "lola";
    try {
    const encodedCredentials = btoa(`${username}:${password}`); // Base64 encoding of "username:password"
      await axios.post('/admin/create-admin-user', user, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`,
        }
      });
      alert('Admin user created successfully!');
      // Reset form
      setUser({
        userName: '',
        password: ''
      });
    } catch (error) {
      console.error('Error creating admin user:', error);
      alert('Failed to create admin user');
    }
  };

  return (
    <div className="create-admin-user">
      <h2>Create Admin User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Admin User</button>
      </form>
    </div>
  );
};

export default CreateAdminUser;