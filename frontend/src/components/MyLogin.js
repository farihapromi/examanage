import React, { useState } from 'react';
import axios from'axios';

function MyLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    axios.post('http://127.0.0.1:8000/teachers/login/', {
      username: username,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .then(data => {
      if (data.success && data.is_department_chairman) {
        // Authentication successful and user is a department chairman
        console.log('dept chairman')
        // Redirect to dashboard or do something else
      } else {
        // Authentication failed or user is not a department chairman
        // Show error message or do something else
        console.log('error')
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Login</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default MyLogin;
