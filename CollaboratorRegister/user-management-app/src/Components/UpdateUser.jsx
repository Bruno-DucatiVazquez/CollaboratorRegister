import React, { useState, useEffect } from 'react';
import axios from 'axios';

const updateUserStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
  maxWidth: '600px',
  margin: '0 auto',
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

const departmentLabelStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '10px 0',
};

const errorStyle = {
  color: 'red',
};

function UpdateUser({ userId, goToList, user: initialUser }) {
  const [user, setUser] = useState(initialUser);
  const [tempName, setTempName] = useState(user.name);
  const [tempEmail, setTempEmail] = useState(user.email);
  const [selectedDepartment, setSelectedDepartment] = useState(user.department ? user.department.id : 1);
  const [error, setError] = useState('');

  const departments = [
    { id: 1, name: 'Gestao' },
    { id: 2, name: 'Informatica' },
  ];

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/users/${userId}`)
        .then((response) => {
          setUser(response.data);
          setTempName(response.data.name);
          setTempEmail(response.data.email);
          setSelectedDepartment(response.data.department ? response.data.department.id : 1);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
        });
    }
  }, [userId]);

  const updateUser = async () => {
    // Check if the name is empty
    if (!tempName) {
      setError('Name cannot be empty.');
      return;
    }

    // Check if the email is in the correct format
    if (tempEmail && !isEmailValid(tempEmail)) {
      setError('Email is not in the correct format.');
      return;
    }

    try {
      const updatedUser = { ...user };

      if (tempName.trim() !== '') {
        updatedUser.name = tempName;
      }

      if (tempEmail.trim() !== '') {
        updatedUser.email = tempEmail;
      }

      updatedUser.department = departments.find((dep) => dep.id === selectedDepartment);

      await axios.put(`http://localhost:8080/users/update/${userId}`, updatedUser);
      goToList();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  }

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/users/delete/${userId}`);
      goToList();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const isEmailValid = (email) => {
    // Regular expression for a simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div style={updateUserStyle}>
      <h1>Update User</h1>
      <form style={formStyle}>
        <input
          id='Name'
          type="text"
          placeholder="Name"
          value={tempName}
          style={inputStyle}
          onChange={(e) => {
            const newName = e.target.value;
            setTempName(newName);
          }}
        />
        <input
          id='Email'
          type="text"
          placeholder="Email"
          value={tempEmail}
          style={inputStyle}
          onChange={(e) => {
            const newEmail = e.target.value;
            setTempEmail(newEmail);
          }}
        />

        <div style={departmentLabelStyle}>
          <label>Department:</label>
        </div>
        <select
          value={selectedDepartment}
          style={selectStyle}
          onChange={(e) => {
            setSelectedDepartment(parseInt(e.target.value));
          }}
        >
          {departments.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>

        <button style={buttonStyle} onClick={updateUser}>
          Update User
        </button>
        <button style={{ ...buttonStyle, backgroundColor: 'red' }} onClick={deleteUser}>
          Delete User
        </button>
        <button style={buttonStyle} onClick={goToList}>
          Back to User List
        </button>
        {error && <p style={errorStyle}>{error}</p>}
      </form>
    </div>
  );
}

export default UpdateUser;
