import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUser from './UpdateUser';
import CreateUser from './CreateUser'; // Import the CreateUser component

const pageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const userListStyle = {
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

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const headerStyle = {
  fontSize: '24px',
  marginBottom: '20px',
};

const tableHeaderStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
};

const tableCellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};

const buttonStyle = {
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '8px 16px',
  transition: 'background-color 0.2s',
};

const buttonHoverStyle = {
  backgroundColor: '#0056b3',
};

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState('userList');
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);

  const fetchUserList = () => {
    axios.get('http://localhost:8080/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const goToCreate = () => {
    setCurrentPage('createUser');
  };

  const goToUpdate = (userId) => {
    setCurrentPage('updateUser');
    setUserIdToUpdate(userId);
  };

  const goToList = () => {
    setCurrentPage('userList');
    fetchUserList();
  };

  return (
    <div style={pageContainerStyle}>
      <div style={userListStyle}>
        {currentPage === 'userList' && (
          <div>
            <h1 style={headerStyle}>User List</h1>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={{ ...tableCellStyle, ...tableHeaderStyle }}>Name</th>
                  <th style={{ ...tableCellStyle, ...tableHeaderStyle }}>Email</th>
                  <th style={{ ...tableCellStyle, ...tableHeaderStyle }}>Department</th>
                  <th style={{ ...tableCellStyle, ...tableHeaderStyle }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td style={tableCellStyle}>{user.name}</td>
                    <td style={tableCellStyle}>{user.email}</td>
                    <td style={tableCellStyle}>{user.department ? user.department.name : 'N/A'}</td>
                    <td style={tableCellStyle}>
                      <button style={buttonStyle} onClick={() => goToUpdate(user.id)}>Update User</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button style={buttonStyle} onClick={goToCreate}>Create User</button>
          </div>
        )}

        {currentPage === 'updateUser' && (
          <UpdateUser
            goToList={goToList}
            userId={userIdToUpdate}
            user={users.find(u => u.id === userIdToUpdate)}
          />
        )}

        {currentPage === 'createUser' && (
          <CreateUser goToList={goToList} />
        )}
      </div>
    </div>
  );
}

export default UserList;
