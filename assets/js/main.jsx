import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './components/auth/authContext';

import '../scss/main.scss';

import Blogify from './components/Blogify';

// eslint-disable-next-line no-console
console.log('Init Blogify!!');

const Providers = ({ children }) => <AuthProvider>{children}</AuthProvider>;

/** App */
ReactDOM.render(
  <Providers>
    <Blogify />
  </Providers>,
  document.getElementById('app'),
);
