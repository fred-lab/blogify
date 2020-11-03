import React, { useContext } from 'react';
import { logout } from '../../api';
import { LOGOUT } from '../auth/authReducer';
import AuthContext from '../auth/authContext';

export default function Dashboard() {
  const { dispatch } = useContext(AuthContext);
  const onLogout = async (e) => {
    e.preventDefault();

    const response = await logout();

    if (response.ok) {
      dispatch({ type: LOGOUT });
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
