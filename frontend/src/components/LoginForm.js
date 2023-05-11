import React, { useState } from 'react';

import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/teachers/login/', { email, password })
      .then(response => {
        if (response.status === 200) {
          const token = response.data.token;
          console.log(token)
          localStorage.setItem('token', token);
          // TODO: Store the token in the browser's local storage or as a cookie
          // TODO: Redirect the user to a private page
          console.log("Login successful");
        } else {
          console.log("Login failed");
        }
      })
      .catch(error => {
        console.log("Login failed: ", error);
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
