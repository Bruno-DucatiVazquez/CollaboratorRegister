import React, { useState } from 'react';
import axios from 'axios';

const createUserStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
};

const formStyle = {
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '5px 0',
  border: '1px solid #ccc',
  borderRadius: '3px',
};

const selectStyle = {
  width: '100%',
  padding: '10px',
  margin: '5px 0',
  border: '1px solid #ccc',
  borderRadius: '3px',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
  margin: '5px 0',
};

const errorStyle = {
  color: 'red',
};

function CreateUser({ goToList }) {
  const [newUser, setNewUser] = useState({ name: '', email: '', department: { id: 1, name: 'Gestao' } });
  const [error, setError] = useState('');
  const departments = [
    { id: 1, name: 'Gestao' },
    { id: 2, name: 'Informatica' },
  ];

  const isEmailValid = (email) => {
    // Regular expression for a simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const createUser = async () => {
    // Check if the name is empty
    if (!newUser.name) {
      setError('Name cannot be empty.');
      return;
    }

    // Check if the email is in the correct format
    if (!isEmailValid(newUser.email)) {
      setError('Email is not in the correct format.');
      return;
    }

    try {
      // Send a POST request to create a new user
      await axios.post('http://localhost:8080/users', newUser);
      goToList(); // Navigate back to the list page
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div style={createUserStyle}>
      <h1>Create User</h1>
      <form style={formStyle}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          style={inputStyle}
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
            setError(''); // Clear the error message when the user starts typing
          }}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          style={inputStyle}
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
            setError(''); // Clear the error message when the user starts typing
          }}
        />
        <select
          value={newUser.department.id}
          style={selectStyle}
          onChange={(e) => {
            const selectedDepartment = departments.find((dep) => dep.id === parseInt(e.target.value));
            setNewUser({ ...newUser, department: selectedDepartment });
          }}
        >
          {departments.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>
        <button style={buttonStyle} onClick={createUser}>Create User</button>
        {error && <p style={errorStyle}>{error}</p>}
      </form>
      <button style={buttonStyle} onClick={goToList}>Back to User List</button>
    </div>
  );
}

export default CreateUser;
