import React, { useContext } from 'react';
import Login from './auth/Login';
import AuthContext from './auth/authContext';
import Dashboard from './dashboard/Dashboard';

export default function Blogify() {
  const { user } = useContext(AuthContext);
  return <>{user.isAuth ? <Dashboard /> : <Login />}</>;
}
