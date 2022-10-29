import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="signupFormDiv">
      <form onSubmit={handleFormSubmit} className="signupForm">
      <h2>Signup</h2>
        <div className="signupFormUN">
          <label htmlFor="username">Username:</label><br />
          <input
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="signupFormEmail">
          <label htmlFor="email">Email:</label><br />
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="signupFormPASS">
          <label htmlFor="pwd">Password:</label><br />
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="signupFormSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to="/login">← Go to Login</Link>
    </div>
  );
}

export default Signup;