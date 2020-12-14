import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/auth/authContext';

import '../scss/main.scss';

import Blogify from './components/Blogify';

// eslint-disable-next-line no-console
console.log('Init Blogify!!');

const Providers = ({ children }) => <AuthProvider>{children}</AuthProvider>;

/** App */
ReactDOM.render(
  <Router>
    <Providers>
      <Blogify />
    </Providers>
  </Router>,
  document.getElementById('app'),
);
