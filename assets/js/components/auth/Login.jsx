import React, { useContext, useState, useEffect } from 'react';
import { login } from '../../api';
import { LOGIN } from './authReducer';
import AuthContext from './authContext';
import { Input } from '../shared/Form';

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  /**
   * Test if an email is valid
   * @param {string} email
   */
  const isEmailvalid = (mail) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(mail);
  };

  /**
   * Log the user
   * @param {Event} e
   */
  const onLogin = async (e) => {
    e.preventDefault();

    setMessage('');

    if (password && email) {
      if (!isEmailvalid(email)) {
        setMessage('Email is invalid');
        return false;
      }

      const response = await login({
        email,
        password,
      });

      const data = await response.json();
      if (data.user && data.user.isAuth) {
        dispatch({ type: LOGIN, payload: data.user });
      } else {
        setMessage(data.message);
      }
      return true;
    }
    setMessage('Provide credentials');
    return false;
  };

  /**
   *
   * @param {Event} e
   */
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onLogin(e);
    }
  };

  /**
   * Reset the message everytime the mail or password is updated
   */
  useEffect(() => {
    setMessage('');
  }, [email, password]);

  return (
    <section className="modal-container">
      <div className="modal">
        <div
          className={
            message ? 'login-container animate__shakeX' : 'login-container'
          }
        >
          <h1>Blogify</h1>
          <span className="message">{message}</span>
          <div className="login-form">
            <Input
              type="email"
              value={email}
              onFocus={() => setEmail('')}
              onChange={(e) => setEmail(e.target.value)}
              className={email ? 'login filled' : 'login'}
              placeholder="Email"
            >
              Email
            </Input>
            <Input
              type="password"
              value={password}
              onFocus={() => setPassword('')}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={onKeyPress}
              className={password ? 'login filled' : 'login'}
              placeholder="Password"
            >
              Password
            </Input>
            <div className="login-action">
              <span>Forgot Password?</span>
              <button className="login-button" type="button" onClick={onLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
