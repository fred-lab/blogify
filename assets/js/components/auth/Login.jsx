import React, { useContext, useState } from 'react';
import { login } from '../../api';
import { LOGIN } from './authReducer';
import AuthContext from './authContext';

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    const response = await login({
      email,
      password,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.user.isAuth) {
        dispatch({ type: LOGIN, payload: data.user });
      }
    }
  };
  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={onLogin}>
        Login
      </button>
    </div>
  );
}
