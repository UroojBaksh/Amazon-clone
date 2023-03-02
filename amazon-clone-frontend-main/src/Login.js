import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import axios from './axios';
import { useStateValue } from './StateProvider';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post('/user/login', { email, password });

    if (response.status === 200) {
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      dispatch({
        type: 'SET_USER',
        user: response.data.data,
      });
      setEmail('');
      setPassword('');
      history.goBack();
    } else {
      setError(response.data.message);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post('/user/register', { email, password });

    if (response.status === 200) {
      setMessage(response.data.message);
      setEmail('');
      setPassword('');
      history.push('/login');
    } else {
      setError(response.data.message);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className="login__logo"
        />
      </Link>

      <div className="login__container">
        <h1 className="login__title">Sign-In</h1>

        <form onSubmit={loginHandler}>
          <label className="login__label" htmlFor="email">
            Email
          </label>
          <input
            className="login__input"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label className="login__label" htmlFor="password">
            Password
          </label>
          <input
            className="login__input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className="login__signInButton" type="submit">
            Sign In
          </button>
        </form>

        <p className="login__text">
          By signing-in you agree to the AMAZON CLONE Conditions of Use &amp;
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button className="login__registerButton" onClick={registerHandler}>
          Create Your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
