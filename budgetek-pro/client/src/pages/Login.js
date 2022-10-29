import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { username: formState.username, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      console.log(token)
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="loginFormDiv">
      <form onSubmit={handleFormSubmit} className="loginForm">
      <h2>Login</h2>
        <div className="loginDivUN">
          <label htmlFor="username">username or email:</label><br />
          <input
            placeholder="username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="loginDivPASS">
          <label htmlFor="pwd">Password:</label><br />
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="loginDivSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to="/signup">← Go to Signup</Link>
    </div>
  );
}

export default Login;